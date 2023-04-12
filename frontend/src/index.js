import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import reportWebVitals from './utils/reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
