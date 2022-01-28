import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme, ThemeProvider}
 from "@material-ui/core";
import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";

const theme = createMuiTheme({
  palette:{
    primary:{
      main:'#ffbb00',
    },
    secondary:{
      main:'#e5e5e5',
      contrastText:'#e5e5e5',
    },
  }
  
})

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <Provider 
    store={createStoreWidthMiddleware(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
   <ThemeProvider theme={theme}>
     <BrowserRouter> 
     <App/>
     </BrowserRouter>
   </ThemeProvider>
  </Provider>,
 document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();