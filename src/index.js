import React from 'react'
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'
import App from './containers/App'
import './index.css'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
