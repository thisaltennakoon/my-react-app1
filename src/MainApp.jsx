import { ThemeProvider } from '@material-ui/core/styles';
import useChoreoTheme from './theme/Theme.js';
import { IntlProvider } from 'react-intl';
import App from './MCPInspector/index';
import { SnackbarProvider } from 'notistack';

function MainApp() {
const theme = useChoreoTheme(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="en" messages={{}}>
          <SnackbarProvider>
<App />
          </SnackbarProvider>
          
        </IntlProvider>
      </ThemeProvider>
    </>
  )
}

export default MainApp
