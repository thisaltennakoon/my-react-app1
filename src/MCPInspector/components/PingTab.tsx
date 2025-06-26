import { Box, Typography } from '@material-ui/core';
import Button from './ChoreoSystem/Button/Button';
import { TabsContent } from './ui/tabs';

const PingTab = ({ onPingClick }: { onPingClick: () => void }) => (
    <TabsContent value="ping">
      <div className="grid grid-cols-2 gap-4">
        <Box
          display="flex"
          mt={3}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gridGap={8}
        >
          <Button
            onClick={onPingClick}
            className="font-bold py-6 px-12 rounded-full"
            testId="inspector-ping-btn"
          >
            Ping Server
          </Button>
          <Typography variant="body1">
            Allows the Client to verify that their counterpart is still
            responsive and the connection is alive.
          </Typography>
        </Box>
      </div>
    </TabsContent>
  );

export default PingTab;
