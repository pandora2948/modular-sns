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
    loader: ({ request }) => {
      const temp = Object.entries(qs.parse(request.url))
        .map(([__, value]) => value);
      return [temp[temp.length - 1], ...temp].slice(0, temp.length);
    }
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
