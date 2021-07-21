import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';

import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import IndividualFollow from './pages/reports/IndividualFollow';
import EntryFollow from './pages/reports/EntryFollow';
import CoachingSesion from './pages/reports/CoachingSesion';

import Blog from './pages/Blog';
import User from './pages/User';
import ChatBoss from './pages/ChatBoss';

import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'chat', element: <ChatBoss /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'follow-ups', element: <IndividualFollow /> },
        { path: 'new-plan', element: <EntryFollow /> },
        { path: 'coaching-sesion', element: <CoachingSesion /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'recover-password', element: <RecoverPassword /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Login /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
