import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './config/styles.css';
import { worker } from './mocks/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start().then(r => {
    console.log('MSW 워커 서비스가 시작되었습니다.');
    console.log(r);
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
