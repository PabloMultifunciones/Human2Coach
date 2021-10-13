import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import pieChartFill from '@iconify/icons-eva/pie-chart-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },

  {
    title: 'Chat',
    path: '/dashboard/chat',
    icon: getIcon(messageCircleFill)
  },

  {
    title: 'Follow ups',
    path: '/dashboard/follow-ups',
    icon: getIcon(clipboardOutline)
  },
  {
    title: 'Pending',
    path: '/dashboard/pending',
    icon: getIcon(clipboardOutline)
  },
  {
    title: 'Alerts',
    path: '/dashboard/alerts',
    icon: getIcon(alertCircleFill)
  },
  {
    title: 'Nuevo plan',
    path: '/dashboard/new-plan',
    icon: getIcon(clipboardOutline)
  },

  {
    title: 'Coaching Sesion',
    path: '/dashboard/coaching-sesion',
    icon: getIcon(clipboardOutline)
  },

  {
    title: 'Usuarios',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },

  {
    title: 'Métricas',
    path: '/dashboard/metrics',
    icon: getIcon(pieChartFill)
  },

  {
    title: 'Conocimiento',
    path: '/dashboard/knowledge',
    icon: <LiveHelpIcon />
  }
];

export default sidebarConfig;
