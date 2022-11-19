import 'styles/styles.css';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { message } from 'antd';
import FindEmail from 'pages/auth/find-email';
import FindPassword from 'pages/auth/find-password';
import SignIn from 'pages/auth/sign-in';
import SignUp from 'pages/auth/sign-up';
import Error from 'pages/error';
import FeedPage from 'pages/feed';
import SearchHashtagPage from 'pages/search';
import qs from 'qs';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import Profile from './pages/profile';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => message.error(error.message),
  }),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedPage />,
    errorElement: <Error />,
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />,
  },
  {
    path: '/auth/find-email',
    element: <FindEmail />,
  },
  {
    path: '/auth/find-password',
    element: <FindPassword />,
  },
  {
    path: '/search',
    element: <SearchHashtagPage />,
    loader: ({ request }) => {
      const temp = Object.entries(qs.parse(request.url)).map(([__, value]) => value);
      return [temp[temp.length - 1], ...temp].slice(0, temp.length);
    },
  },
  {
    path: 'profile',
    element: <Profile />,
    errorElement: <Error />,
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
