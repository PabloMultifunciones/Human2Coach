import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import Blog from './pages/Blog';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------CUSTOM PAGES
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import IndividualFollow from './pages/reports/IndividualFollow';
import EntryFollow from './pages/reports/EntryFollow';
import CoachingSesion from './pages/reports/CoachingSesion';
import User from './pages/User';
import Knowledge from './pages/Knowledge';
import ProcessDetail from './pages/ProcessDetail';

import ChatBoss from './pages/ChatBoss';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'chat', element: <ChatBoss /> },
        { path: 'follow-ups', element: <IndividualFollow /> },
        { path: 'new-plan', element: <EntryFollow /> },
        { path: 'coaching-sesion', element: <CoachingSesion /> },
        { path: 'user', element: <User /> },
        { path: 'knowledge', element: <Knowledge /> },
        { path: 'process/detail', element: <ProcessDetail /> },
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
