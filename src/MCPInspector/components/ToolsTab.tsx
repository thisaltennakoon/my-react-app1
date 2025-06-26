import {
  CompatibilityCallToolResult,
  ListToolsResult,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Notification from './ChoreoSystem/Notification/Notification';
import { Promote } from './ChoreoSystem/Icons/generated';
import TextInput from './ChoreoSystem/TextInput/TextInput';
import Button from './ChoreoSystem/Button/Button';
import Checkbox from './ChoreoSystem/Checkbox/Checkbox';
import { TabsContent } from './ui/tabs';
import DynamicJsonForm from './DynamicJsonForm';
import type { JsonValue, JsonSchemaType } from '../utils/jsonUtils';
import { generateDefaultValue } from '../utils/schemaUtils';
import ListPane from './ListPane';
import JsonView from './JsonView';
import ToolResults from './ToolResults';
import { useStyles } from './style';

const ToolsTab = ({
  tools,
  listTools,
  clearTools,
  callTool,
  selectedTool,
  setSelectedTool,
  toolResult,
  nextCursor,
  isMcpProxyWithOperationMapping,
}: {
  tools: Tool[];
  listTools: () => void;
  clearTools: () => void;
  callTool: (name: string, params: Record<string, unknown>) => Promise<void>;
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  toolResult: CompatibilityCallToolResult | null;
  nextCursor: ListToolsResult['nextCursor'];
  isMcpProxyWithOperationMapping?: boolean;
}) => {
  const [params, setParams] = useState<Record<string, unknown>>({});
  const [isToolRunning, setIsToolRunning] = useState(false);
  const classes = useStyles();
  const [isOutputSchemaExpanded, setIsOutputSchemaExpanded] = useState(false);

  useEffect(() => {
    const defaultParams = Object.entries(
      selectedTool?.inputSchema.properties ?? []
    ).map(([key, value]) => [
      key,
      generateDefaultValue(value as JsonSchemaType),
    ]);
    setParams(Object.fromEntries(defaultParams));
  }, [selectedTool]);

  return (
    <TabsContent value="tools">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className={classes.toolPanel}>
          <ListPane
            items={tools}
            listItems={listTools}
            clearItems={() => {
              clearTools();
              setSelectedTool(null);
            }}
            setSelectedItem={setSelectedTool}
            renderItem={(tool) => (
              <Box display="flex" flexDirection="column">
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {tool.name}
                </span>
                {/* <span
                  className="text-sm text-gray-500 text-left"
                  style={{ fontSize: '10px' }}
                >
                  {tool.description}
                </span> */}
              </Box>
            )}
            title="Tools"
            buttonText={nextCursor ? 'List More Tools' : 'List Tools'}
            isButtonDisabled={!nextCursor && tools.length > 0}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.resultSection}>
            <Box className={classes.resultSectionHeader}>
              <Typography variant="h4">
                {selectedTool ? selectedTool.name : 'Select a tool'}
              </Typography>
            </Box>
            {isMcpProxyWithOperationMapping && selectedTool ? (
              <Box className={classes.resultSectionBody}>
                <Notification
                  icon="info"
                  color="primary"
                  testId="notification-with-icon"
                >
                  Tool calls for MCP servers created using existing API proxies
                  are not yet supported in this inspector.
                </Notification>
              </Box>
            ) : (
              <div
                className={classes.resultSectionBody}
                style={{ minHeight: '250px' }}
              >
                {selectedTool ? (
                  <div>
                    <Box mb={1} overflow="auto">
                      <Typography variant="body1">
                        {selectedTool.description}
                      </Typography>
                    </Box>
                    {Object.entries(
                      selectedTool.inputSchema.properties ?? []
                    ).map(([key, value]) => {
                      const prop = value as JsonSchemaType;
                      return (
                        <Box key={key} mb={1} mt={1}>
                          <Box mb={1}>
                            <label
                              htmlFor={key}
                              style={{ fontSize: '14px', fontWeight: 600 }}
                            >
                              {key}
                            </label>
                          </Box>
                          <Box>
                            {prop.type === 'boolean' && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                  id={key}
                                  name={key}
                                  checked={!!params[key]}
                                  onChange={(event) =>
                                    setParams({
                                      ...params,
                                      [key]: event.target.checked,
                                    })
                                  }
                                  testId=""
                                />
                                <label
                                  htmlFor={key}
                                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  {prop.description || 'Toggle this option'}
                                </label>
                              </div>
                            )}
                            {prop.type === 'string' && (
                              <TextInput
                                id={key}
                                name={key}
                                placeholder={prop.description}
                                value={(params[key] as string) ?? ''}
                                onChange={(e) =>
                                  setParams({
                                    ...params,
                                    [key]: e.target.value,
                                  })
                                }
                                className="mt-1"
                                testId=""
                              />
                            )}
                            {(prop.type === 'object' ||
                              prop.type === 'array') && (
                              <div className="mt-1">
                                <DynamicJsonForm
                                  schema={{
                                    type: prop.type,
                                    properties: prop.properties,
                                    description: prop.description,
                                    items: prop.items,
                                  }}
                                  value={
                                    (params[key] as JsonValue) ??
                                    generateDefaultValue(prop)
                                  }
                                  onChange={(newValue: JsonValue) => {
                                    setParams({
                                      ...params,
                                      [key]: newValue,
                                    });
                                  }}
                                />
                                <></>
                              </div>
                            )}
                            {(prop.type === 'number' ||
                              prop.type === 'integer') && (
                              <TextInput
                                type="number"
                                id={key}
                                name={key}
                                placeholder={prop.description}
                                value={(params[key] as string) ?? ''}
                                onChange={(e) =>
                                  setParams({
                                    ...params,
                                    [key]: Number(e.target.value),
                                  })
                                }
                                className="mt-1"
                                testId=""
                              />
                            )}
                            {![
                              'boolean',
                              'string',
                              'object',
                              'array',
                              'number',
                              'integer',
                            ].includes(prop.type) && (
                              <div className="mt-1">
                                <DynamicJsonForm
                                  schema={{
                                    type: prop.type,
                                    properties: prop.properties,
                                    description: prop.description,
                                    items: prop.items,
                                  }}
                                  value={params[key] as JsonValue}
                                  onChange={(newValue: JsonValue) => {
                                    setParams({
                                      ...params,
                                      [key]: newValue,
                                    });
                                  }}
                                />
                              </div>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                    {selectedTool.outputSchema && (
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold">
                            Output Schema:
                          </h4>
                          <Button
                            variant="contained"
                            onClick={() =>
                              setIsOutputSchemaExpanded(!isOutputSchemaExpanded)
                            }
                            className="h-6 px-2"
                            testId="expan-data"
                          >
                            {isOutputSchemaExpanded ? (
                              <>
                                <KeyboardArrowUpIcon />
                                Collapse
                              </>
                            ) : (
                              <>
                                <KeyboardArrowDownIcon />
                                Expand
                              </>
                            )}
                          </Button>
                        </div>
                        <div
                          className={`transition-all ${
                            isOutputSchemaExpanded
                              ? ''
                              : 'max-h-[8rem] overflow-y-auto'
                          }`}
                        >
                          <JsonView data={selectedTool.outputSchema} />
                        </div>
                      </div>
                    )}
                    {isToolRunning ? (
                      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60px">
                        <CircularProgress size={30}/>
                      </Box>
                    ) : (
                      <Button
                        fullWidth
                        onClick={async () => {
                          try {
                            setIsToolRunning(true);
                            await callTool(selectedTool.name, params);
                          } finally {
                            setIsToolRunning(false);
                          }
                        }}
                        disabled={isToolRunning}
                        testId="run-tool-btn"
                        startIcon={<Promote className="w-4 h-4" />}
                      >
                        Run Tool
                      </Button>
                    )}
                    <ToolResults
                      toolResult={toolResult}
                      selectedTool={selectedTool}
                    />
                  </div>
                ) : (
                  <FormattedMessage
                    id="pages.MCP.Inspector.ToolsTab.ToolResults"
                    defaultMessage="Select a tool from the list to view its details and run it"
                  />
                )}
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </TabsContent>
  );
};

export default ToolsTab;
