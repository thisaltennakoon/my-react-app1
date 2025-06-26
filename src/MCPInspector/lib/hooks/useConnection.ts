import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  ClientRequest,
  Request,
  Result,
  ServerCapabilities,
} from '@modelcontextprotocol/sdk/types.js';
import { RequestOptions } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { useState } from 'react';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { z } from 'zod';
import { useIntl } from 'react-intl';
import useChoreoSnackbar from '../../components/ChoreoSystem/hooks/choreoSnackbar';
import { ConnectionStatus } from '../constants';
import { Notification } from '../notificationTypes';

interface UseConnectionOptions {
  url: string | undefined;
  token: string | undefined;
  headerName: string;
}

export function useConnection({
  url,
  token,
  headerName,
}: UseConnectionOptions) {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');
  const showSnackbar = useChoreoSnackbar();
  const intl = useIntl();
  const [serverCapabilities, setServerCapabilities] =
    useState<ServerCapabilities | null>(null);
  const [mcpClient, setMcpClient] = useState<Client | null>(null);
  const [clientTransport, setClientTransport] = useState<Transport | null>(
    null
  );

  /**
   * Shows an error snackbar with the given error message, truncated if necessary.
   * @param {string} errorString - The error message to display.
   * @param {object} intl - The react-intl object for formatting messages.
   * @param {function} showSnackbar - The snackbar function to show messages.
   */
  function showErrorSnackbar(errorString: string) {
    const MAX_ERROR_LENGTH = 200;
    const truncatedErrorString =
      errorString.length > MAX_ERROR_LENGTH
        ? `${errorString.substring(0, MAX_ERROR_LENGTH)}...`
        : errorString;

    showSnackbar(
      intl.formatMessage({
        defaultMessage: truncatedErrorString,
        id: 'pages.MCP.Inspector.useConnection.makeRequest',
      }),
      { variant: 'error' }
    );
  }

  const makeRequest = async <T extends z.ZodType>(
    request: ClientRequest,
    schema: T,
    options?: RequestOptions & { suppressToast?: boolean }
  ): Promise<z.output<T>> => {
    if (!mcpClient) {
      throw new Error('MCP client not connected');
    }
    try {
      // prepare MCP Client request options
      const mcpRequestOptions: RequestOptions = {
        timeout: 60000,
        maxTotalTimeout: 60000,
      };
      return await mcpClient.request(request, schema, mcpRequestOptions);
    } catch (e: unknown) {
      if (!options?.suppressToast) {
        const errorString = (e as Error).message ?? String(e);
        showErrorSnackbar(errorString);
      }
      throw e;
    }
  };

  const is401Error = (error: unknown): boolean =>
    (error instanceof Error && error.message.includes('401')) ||
    (error instanceof Error && error.message.includes('Unauthorized'));

  const connect = async (_e?: unknown, retryCount: number = 0) => {
    const client = new Client<Request, Notification, Result>(
      {
        name: 'mcp-inspector',
        version: '0.13.0',
      },
      {
        capabilities: {
          sampling: {},
          roots: {
            listChanged: true,
          },
        },
      }
    );

    try {
      // Inject auth manually instead of using SSEClientTransport, because we're
      // proxying through the inspector server first.
      const headers: HeadersInit = {};

      if (token !== undefined) {
        headers[headerName] = token;
      }

      const mcpProxyServerUrl = new URL(url as string);

      let capabilities;
      try {
        const transport = new StreamableHTTPClientTransport(
          mcpProxyServerUrl as URL,
          {
            sessionId: undefined,
            requestInit: {
              headers,
            },
            // TODO these should be configurable...
            reconnectionOptions: {
              maxReconnectionDelay: 30000,
              initialReconnectionDelay: 1000,
              reconnectionDelayGrowFactor: 1.5,
              maxRetries: 2,
            },
          }
        );

        await client.connect(transport as Transport);

        setClientTransport(transport);

        capabilities = client.getServerCapabilities();
      } catch (error) {
        console.error(
          `Failed to connect to MCP Server via the MCP Inspector Proxy: ${mcpProxyServerUrl}:`,
          error
        );
        setConnectionStatus('error');

        if (is401Error(error)) {
          showErrorSnackbar(
            'Internal key authentication failed. Make sure ' +
              'you have provided the correct security credentials'
          );
          return;
        }
        showErrorSnackbar(
          error instanceof Error ? error.message : String(error)
        );
        throw error;
      }
      setServerCapabilities(capabilities ?? null);

      setMcpClient(client);
      setConnectionStatus('connected');
    } catch (e) {
      console.error(e);
      setConnectionStatus('error');
    }
  };

  const disconnect = async () => {
    await (clientTransport as StreamableHTTPClientTransport).terminateSession();
    await mcpClient?.close();
    setMcpClient(null);
    setClientTransport(null);
    setConnectionStatus('disconnected');
    setServerCapabilities(null);
  };

  return {
    connectionStatus,
    serverCapabilities,
    mcpClient,
    makeRequest,
    connect,
    disconnect,
  };
}
