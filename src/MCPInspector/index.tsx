import {
  ClientRequest,
  CompatibilityCallToolResult,
  CompatibilityCallToolResultSchema,
  EmptyResultSchema,
  ListToolsResultSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { FormattedMessage, useIntl } from 'react-intl';
import React, { useEffect, useRef, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { z } from 'zod';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from './components/ChoreoSystem/layouts/Page';
import { MenuSubAPIManagement } from './components/ChoreoSystem/Icons/generated';
// import { ReactComponent as MCPInspectorConnect
// } from './components/ChoreoSystem/Images/Templates/MCPInspectorConect';
import { cacheToolOutputSchemas } from './utils/schemaUtils';
import { useConnection } from './lib/hooks/useConnection';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import ConsoleTab from './components/ConsoleTab';
import PingTab from './components/PingTab';
import Sidebar from './components/Sidebar';
import ToolsTab from './components/ToolsTab';
import { useStyles } from './style';

interface AppProps {
  url?: string;
  token?: string;
  isTokenFetching?: boolean;
  isUrlFetching?: boolean;
  handleTokenRegenerate?: () => void;
  isMcpProxyWithOperationMapping?: boolean;
}

const App = ({
  url: initialUrl,
  token: initialToken,
  isTokenFetching,
  isUrlFetching,
  handleTokenRegenerate,
  isMcpProxyWithOperationMapping,
}: AppProps) => {
  const classes = useStyles();
  const [token, setToken] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolResult, setToolResult] =
    useState<CompatibilityCallToolResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({
    resources: null,
    prompts: null,
    tools: null,
  });

  useEffect(() => {
    setUrl(initialUrl || '');
  }, [initialUrl]);

  useEffect(() => {
    setToken(initialToken || '');
  }, [initialToken]);

  const headerName = 'test-key';
  const intl = useIntl();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [nextToolCursor, setNextToolCursor] = useState<string | undefined>();
  const progressTokenRef = useRef(0);

  const {
    connectionStatus,
    serverCapabilities,
    mcpClient,
    makeRequest,
    connect: connectMcpServer,
    disconnect: disconnectMcpServer,
  } = useConnection({
    url,
    token,
    headerName,
  });

  const clearError = (tabKey: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [tabKey]: null }));
  };

  const sendMCPRequest = async <T extends z.ZodType>(
    request: ClientRequest,
    schema: T,
    tabKey?: keyof typeof errors
  ) => {
    try {
      const response = await makeRequest(request, schema);
      if (tabKey !== undefined) {
        clearError(tabKey);
      }
      return response;
    } catch (e) {
      const errorString = (e as Error).message ?? String(e);
      if (tabKey !== undefined) {
        setErrors((prev) => ({
          ...prev,
          [tabKey]: errorString,
        }));
      }
      throw e;
    }
  };

  const listTools = async () => {
    const response = await sendMCPRequest(
      {
        method: 'tools/list' as const,
        params: nextToolCursor ? { cursor: nextToolCursor } : {},
      },
      ListToolsResultSchema,
      'tools'
    );
    setTools(response.tools);
    setNextToolCursor(response.nextCursor);
    // Cache output schemas for validation
    cacheToolOutputSchemas(response.tools);
  };

  const callTool = async (name: string, params: Record<string, unknown>) => {
    try {
      const response = await sendMCPRequest(
        {
          method: 'tools/call' as const,
          params: {
            name,
            arguments: params,
            _meta: {
              progressToken: (progressTokenRef.current += 1),
            },
          },
        },
        CompatibilityCallToolResultSchema,
        'tools'
      );
      setToolResult(response);
    } catch (e) {
      setToolResult({
        content: [
          {
            type: 'text',
            text: (e as Error).message ?? String(e),
          },
        ],
        isError: true,
      });
    }
  };

  return (
    <Page
      title={intl.formatMessage({
        defaultMessage: 'MCP Inspector',
        id: 'pages.MCP.Inspector.Title',
      })}
    >
      <Box className={classes.componentLevelPageContainer}>
        <Typography variant="h2">
          <FormattedMessage
            id="pages.MCP.Inspector.Title"
            defaultMessage="MCP Inspector"
          />
        </Typography>
        <Grid container md={12}>
          <Grid item xs={12} md={3} className={classes.inspectorSlider}>
            <Sidebar
              connectionStatus={connectionStatus}
              url={url}
              setUrl={setUrl}
              token={token}
              setToken={setToken}
              isTokenFetching={isTokenFetching}
              isUrlFetching={isUrlFetching}
              handleTokenRegenerate={handleTokenRegenerate}
              onConnect={connectMcpServer}
              onDisconnect={disconnectMcpServer}
            />
          </Grid>
          <Grid item xs={12} md={8} className={classes.inspectorRightSlider}>
            <Box className={classes.inspectorResult}>
              {mcpClient ? (
                <Tabs
                  defaultValue="tools"
                  className="w-full p-4"
                  onValueChange={(value) => {
                    window.location.hash = value;
                  }}
                >
                  <TabsList className={classes.tabsList}>
                    <TabsTrigger value="tools" className={classes.tabTrigger}>
                      <MenuSubAPIManagement className={classes.tabIcon} />
                      Tools
                    </TabsTrigger>
                    <TabsTrigger value="ping" className={classes.tabTrigger}>
                      <NotificationsIcon className={classes.tabIcon} />
                      Ping
                    </TabsTrigger>
                  </TabsList>

                  <div className="w-full">
                    {!serverCapabilities?.tools ? (
                      <>
                        <div className="flex items-center justify-center p-4">
                          <p className="text-lg text-gray-500 dark:text-gray-400">
                            The connected server does not support any MCP
                            capabilities
                          </p>
                        </div>
                        <PingTab
                          onPingClick={() => {
                            sendMCPRequest(
                              {
                                method: 'ping' as const,
                              },
                              EmptyResultSchema
                            ).catch((e) => {
                              console.error('Ping failed:', e);
                            });
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <ToolsTab
                          tools={tools}
                          listTools={() => {
                            clearError('tools');
                            listTools();
                          }}
                          clearTools={() => {
                            setTools([]);
                            setNextToolCursor(undefined);
                            // Clear cached output schemas
                            cacheToolOutputSchemas([]);
                          }}
                          callTool={async (name, params) => {
                            clearError('tools');
                            setToolResult(null);
                            await callTool(name, params);
                          }}
                          selectedTool={selectedTool}
                          setSelectedTool={(tool) => {
                            clearError('tools');
                            setSelectedTool(tool);
                            setToolResult(null);
                          }}
                          toolResult={toolResult}
                          nextCursor={nextToolCursor}
                          isMcpProxyWithOperationMapping={
                            isMcpProxyWithOperationMapping
                          }
                        />
                        <ConsoleTab />
                        <PingTab
                          onPingClick={() => {
                            sendMCPRequest(
                              {
                                method: 'ping' as const,
                              },
                              EmptyResultSchema
                            ).catch((e) => {
                              console.error('Ping failed:', e);
                            });
                          }}
                        />
                      </>
                    )}
                  </div>
                </Tabs>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box>
                    {/* <MCPInspectorConnect /> */}
                  </Box>
                  <Typography variant="h4">
                    Connect to an MCP server to start inspecting
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default App;
