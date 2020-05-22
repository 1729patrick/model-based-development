import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 22,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
    <ToastContainer />
  </MuiThemeProvider>,
  document.getElementById('root')
);
