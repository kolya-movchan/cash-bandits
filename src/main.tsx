import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './components';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Container } from 'react-bootstrap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
