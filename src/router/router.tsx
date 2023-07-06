import { createBrowserRouter } from 'react-router-dom';
import { Auth } from '../pages/Auth';
import { Categories } from '../pages/Categories';
import { ErrorPage } from '../pages/ErrorPage';
import { Home } from '../pages/Home';
import { Layout } from '../pages/Layout';
import { Tasks } from '../pages/Tasks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'categories',
        element: <Categories />,
      },

      {
        path: 'tasks',
        element: <Tasks />,
      },

      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);
