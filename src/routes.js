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
import Alerts from './pages/reports/Alerts';
import EntryFollow from './pages/reports/EntryFollow';
import CoachingSesion from './pages/reports/CoachingSesion';
import Pending from './pages/reports/Pending';

import User from './pages/User';
import Metric from './pages/Metric';

import Knowledge from './pages/Knowledge';
import ProcessDetail from './pages/ProcessDetail';
import SubProcessDetail from './pages/SubProcessDetail';

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
        { path: 'chat', element: <ChatBoss /> }, // Maybe this routes will be deleted
        { path: 'plans', element: <IndividualFollow /> },
        { path: 'pending', element: <Pending /> },
        { path: 'alerts', element: <Alerts /> },
        { path: 'new-plan', element: <EntryFollow /> },
        { path: 'coaching-sesion', element: <CoachingSesion /> }, // Maybe this routes will be deleted
        { path: 'metrics', element: <Metric /> },
        { path: 'users', element: <User /> },
        { path: 'knowledge', element: <Knowledge /> },
        { path: 'process/detail', element: <ProcessDetail /> },
        { path: 'sub-process/detail', element: <SubProcessDetail /> },
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
