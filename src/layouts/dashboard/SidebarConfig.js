import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';

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
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },

  {
    title: 'Conocimiento',
    path: '/dashboard/knowledge',
    icon: <LiveHelpIcon />
  }
];

export default sidebarConfig;
