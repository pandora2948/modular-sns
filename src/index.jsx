import 'setup';
import 'styles/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import FindEmail from 'pages/auth/find-email';
import FindPassword from 'pages/auth/find-password';
import SignIn from 'pages/auth/sign-in';
import SignUp from 'pages/auth/sign-up';
import FeedPage from 'pages/feed';
import SearchHashtagPage from 'pages/search';
import qs from 'qs';
import { RecoilRoot } from 'recoil';
import Profile from './pages/profile';
import PasswordConfig from './pages/profile/password-config';
import { ProfileByUsername } from './pages/profile/profile-username';
import UserConfig from './pages/profile/user-config';
import UserDelete from './pages/profile/user-delete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedPage />,
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
  },
  {
    path: 'profile/:username',
    element: <ProfileByUsername />,
  },
  {
    path: '/profile/user-config',
    element: <UserConfig />,
  },
  {
    path: '/profile/password-config',
    element: <PasswordConfig />,
  },
  {
    path: '/profile/user-delete',
    element: <UserDelete />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <RouterProvider router={router}>
      <React.StrictMode>
        <FeedPage />
      </React.StrictMode>
    </RouterProvider>
  </RecoilRoot>
);
