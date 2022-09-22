import React from 'react';
import { createRoot } from 'react-dom/client';
import qs from 'qs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './config/styles.css';
import { worker } from './mocks/worker';
import { Feed } from './pages/Feed';
import { SearchHashtag } from './pages/SearchHashtag';
import { Error } from './pages/Error';


const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) worker.start();

const queryClient = new QueryClient();

const urlSearchParamsFilter = ([key]) =>
  !Number.isNaN(parseInt(key, 10));

const router = createBrowserRouter([
  {
    path:'/',
    element: <Feed />,
    errorElement: <Error />
  },
  {
   path: '/search',
    element: <SearchHashtag />,
    loader: ({ request }) =>
      Object.entries(qs.parse(request.url))
        .filter(urlSearchParamsFilter)
        .map(([__, value]) => value),
  },
]);

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
