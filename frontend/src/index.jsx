// frontend/src/index.jsx
// React Application Entry Point
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 8, 83 (ReactDOM.createRoot & BrowserRouter wrapping)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
