import React from 'react';
import { createRoot } from 'react-dom/client';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import { Feed } from './pages/Feed';
import './config/styles.css';
import { worker } from './mocks/worker';
import { Error } from './pages/Error';

const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) worker.start();

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:'/',
    element: <Feed />,
    errorElement: <Error />
  }
])

const root = createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <Feed />
      </React.StrictMode>
    </RouterProvider>
  </QueryClientProvider>
);
