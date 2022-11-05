import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { worker } from 'api/mocks/worker';
import Error from 'pages/error';
import FeedPage from 'pages/feed';
import SearchHashtagPage from 'pages/search';
import qs from 'qs';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/styles.css';

if (process.env.NODE_ENV === 'development') {
  worker.start().then();
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedPage />,
    errorElement: <Error />,
  },
  {
    path: '/search',
    element: <SearchHashtagPage />,
    loader: ({ request }) => {
      const temp = Object.entries(qs.parse(request.url)).map(
        ([__, value]) => value
      );
      return [temp[temp.length - 1], ...temp].slice(0, temp.length);
    },
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <FeedPage />
      </React.StrictMode>
    </RouterProvider>
  </QueryClientProvider>
);
