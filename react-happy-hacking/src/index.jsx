import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import './config/styles.css';
import { worker } from './mocks/worker';

const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) worker.start();

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
