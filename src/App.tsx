import { BrowserRouter } from 'react-router-dom';
import appRoutes from './pages';

// global-style-setting
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/Global';
import theme from '@styles/Theme';

/**
 * gh-pages deploy를 위해 사용
 *
 *  /mogakco-frontend
 */
const basename = process.env.PUBLIC_URL || '/';

// TODO: need combine Provider
function App() {
  return (
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {appRoutes()}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
