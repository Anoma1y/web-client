import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/createStore';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import { logout } from 'containers/Auth/containers/Signin/store/actions';
// import { debounce } from 'lodash';

// const inactivityLogout = (inactivityTime) => {
//   let inactivityState = false;
//   let inactivityTimer = null;
//
//   const handleInactivity = () => {
//     clearInterval(inactivityTimer)
//     if (inactivityState) store.dispatch(logout());
//
//     inactivityState = false;
//     inactivityTimer = setTimeout(() => {
//       inactivityState = true;
//     }, inactivityTime);
//   };
//
//   document.addEventListener('mousemove', debounce(handleInactivity, 200));
//   document.addEventListener('keydown', debounce(handleInactivity, 200));
//   document.addEventListener('scroll', debounce(handleInactivity, 200));
// }
//
// document.addEventListener('DOMContentLoaded', inactivityLogout(10000));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#54c7f3',
      main: '#2196F3',
      dark: '#2872f3',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
