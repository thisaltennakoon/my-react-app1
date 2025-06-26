import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, InputAdornment } from '@material-ui/core';
import IconButton from './ChoreoSystem/IconButton/IconButton';
import TextInput from './ChoreoSystem/TextInput/TextInput';
import Button from './ChoreoSystem/Button/Button';
import {
  Configuration,
  HidePassword,
  MenuLogout,
  Refresh,
  ShowPassword,
} from './ChoreoSystem/Icons/generated';
import { ConnectionStatus } from '../lib/constants';

interface SidebarProps {
  connectionStatus: ConnectionStatus;
  url?: string;
  setUrl: (url: string) => void;
  token?: string;
  setToken: (token: string) => void;
  isTokenFetching?: boolean;
  isUrlFetching?: boolean;
  handleTokenRegenerate?: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Sidebar = ({
  connectionStatus,
  url,
  setUrl,
  token,
  setToken,
  isTokenFetching,
  isUrlFetching,
  handleTokenRegenerate,
  onConnect,
  onDisconnect,
}: SidebarProps) => {
  const [showBearerToken, setShowBearerToken] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (
      connectionStatus === 'connected' ||
      connectionStatus.startsWith('error')
    ) {
      setIsConnecting(false);
    }
  }, [connectionStatus]);

  const [showPassword, toggleInputType] = React.useState(false);
  const handleEndButtonClick = () => {
    toggleInputType(!showPassword);
  };

  return (
    <Box>
      <Box width="100%" maxWidth={400} mx="auto">
        <Box display="flex" flexDirection="column" gridGap={3}>
          <Box mb={2} display="flex" flexDirection="column" gridGap={12}>
            {isUrlFetching ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="60px">
                <CircularProgress size={30} />
              </Box>
            ) : (
              <TextInput
                label="URL"
                testId="sse-url-input"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
              />
            )}
            {isTokenFetching ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="60px">
                <CircularProgress size={30} />
              </Box>
            ) : (
              <TextInput
                label="Token"
                testId="Authentication-Bearer-Token"
                fullWidth
                value={token}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Add Your Token"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleEndButtonClick}
                      size="small"
                      variant="text"
                      color="primary"
                      testId="secret"
                    >
                      {showPassword ? <ShowPassword /> : <HidePassword />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
            {handleTokenRegenerate && (
              <Box mt={1}>
                <Button
                  fullWidth
                  variant="subtle"
                  onClick={handleTokenRegenerate}
                  data-testid="auth-button"
                  aria-expanded={showBearerToken}
                  testId="inspector-Authentication"
                >
                  Get Test Key
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            <Box display="flex" gridGap={8}>
              {connectionStatus === 'connected' && (
                <>
                  <Button
                    variant="outlined"
                    fullWidth
                    data-testid="connect-button"
                    onClick={() => {
                      onDisconnect();
                      onConnect();
                    }}
                    startIcon={<Refresh fontSize="inherit" />}
                    testId=""
                  >
                    Reconnect
                  </Button>
                  <Button
                    onClick={onDisconnect}
                    color="warning"
                    testId=""
                    fullWidth
                    variant="outlined"
                    startIcon={<MenuLogout fontSize="inherit" />}
                  >
                    Disconnect
                  </Button>
                </>
              )}
              {connectionStatus !== 'connected' && (
                <Button
                  fullWidth
                  className="w-full"
                  onClick={() => {
                    setIsConnecting(true);
                    onConnect();
                  }}
                  testId=""
                  startIcon={<Configuration fontSize="inherit" />}
                >
                  Connect
                </Button>
              )}
            </Box>

            <Box
              mt={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gridGap={12}
            >
              {!isConnecting && (
                <Box
                  width={12}
                  height={12}
                  borderRadius="50%"
                  style={{
                    backgroundColor: (() => {
                      switch (connectionStatus) {
                        case 'connected':
                          return 'green';
                        case 'error':
                        case 'error-connecting-to-proxy':
                          return 'red';
                        default:
                          return 'gray';
                      }
                    })(),
                  }}
                />
              )}

              {isConnecting && (
                <CircularProgress size={14} style={{ color: 'blue' }} />
              )}

              <span style={{ fontSize: '14px' }}>
                {isConnecting
                  ? 'Connecting...'
                  : (() => {
                      switch (connectionStatus) {
                        case 'connected':
                          return 'Connected';
                        case 'error':
                          return 'Connection Error!';
                        case 'error-connecting-to-proxy':
                          return 'Error Connecting to MCP Inspector Proxy - Check Console logs';
                        default:
                          return 'Disconnected';
                      }
                    })()}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
