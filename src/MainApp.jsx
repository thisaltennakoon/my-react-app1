import {ThemeProvider} from '@material-ui/core/styles';
import useChoreoTheme from './theme/Theme.js';
import {IntlProvider} from 'react-intl';
import App from './MCPInspector/index';
import {SnackbarProvider} from 'notistack';
import {ChoreoSnackbarProvider} from "./MCPInspector/components/ChoreoSystem/Snackbar/SnackbarProvider";

function MainApp() {
    const theme = useChoreoTheme(false);
    return (
        <>
            <ThemeProvider theme={theme}>
                <IntlProvider locale="en" messages={{}}>
                    <ChoreoSnackbarProvider>
                        <App/>
                    </ChoreoSnackbarProvider>
                </IntlProvider>
            </ThemeProvider>
        </>
    )
}

export default MainApp
