import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../component/ProtectedRoute';
import { Auth } from '../pages/Auth';
// import { Auth } from '../pages/Auth';
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
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },

      {
        path: 'tasks',
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },

      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);
