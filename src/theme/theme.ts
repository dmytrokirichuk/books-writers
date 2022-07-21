import { green, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      light: green[50],
    },
    warning: {
      main: red[600],
    },
  },
});

export default theme;
