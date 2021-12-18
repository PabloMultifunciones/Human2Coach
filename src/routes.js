import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import Avatar from './pages/Avatar';

import NotFound from './pages/Page404';

// ----------------------------------------------------------------------CUSTOM PAGES
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Plans from './pages/reports/Plans';
import NewPlan from './pages/reports/NewPlan';
import User from './pages/User';
import Metric from './pages/Metric';
import Plan from './components/Plan';
import AuthComponent from './components/AuthComponent';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: localStorage.getItem('sesion') ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'plans', element: <Plans /> },
        { path: 'plan/:id', element: <Plan /> },

        {
          path: 'new-plan',
          element:
            localStorage.getItem('sesion') &&
            JSON.parse(localStorage.getItem('sesion')).user.postion === 3 ? (
              <Navigate to="/dashboard/app" replace />
            ) : (
              <NewPlan />
            )
        },
        {
          path: 'metrics',
          element:
            localStorage.getItem('sesion') &&
            JSON.parse(localStorage.getItem('sesion')).user.postion === 4 ? (
              <Metric />
            ) : (
              <Navigate to="/dashboard/app" replace />
            )
        },
        {
          path: 'users',
          element:
            localStorage.getItem('sesion') &&
            JSON.parse(localStorage.getItem('sesion')).user.postion === 3 ? (
              <Navigate to="/dashboard/app" replace />
            ) : (
              <User />
            )
        },

        { path: 'avatar', element: <Avatar /> }
      ]
    },

    {
      path: '/',
      element: !localStorage.getItem('sesion') ? (
        <LogoOnlyLayout />
      ) : (
        <Navigate to="/dashboard/app" />
      ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'recover-password', element: <RecoverPassword /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Login /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/signin', element: <AuthComponent /> }
  ]);
}
