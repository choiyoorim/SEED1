import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme, ThemeProvider}
 from "@material-ui/core";

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

 ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}><BrowserRouter> 
      <App/>
    </BrowserRouter></ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
