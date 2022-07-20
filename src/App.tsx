import GlobalStateProvider from 'contexts/global-state';
import Home from 'pages/home';

const App = () => (
  <GlobalStateProvider>
    <Home />
  </GlobalStateProvider>
);

export default App;
