import { ThemeProvider } from '@mui/material';

import GlobalStateProvider from 'contexts/global-state';
import Home from 'pages/home';
import theme from 'theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStateProvider>
      <Home />
    </GlobalStateProvider>
  </ThemeProvider>
);

export default App;
