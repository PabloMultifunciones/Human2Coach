import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import pieChartFill from '@iconify/icons-eva/pie-chart-fill';
// import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
// import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'New plan',
    path: '/dashboard/new-plan',
    icon: getIcon(clipboardOutline)
  },
  {
    title: 'Records',
    path: '/dashboard/plans',
    icon: getIcon(clipboardOutline)
  },
  /* 
  
  {
    title: 'Pendientes',
    path: '/dashboard/pending',
    icon: getIcon(clipboardOutline)
  },
  {
    title: 'Alertas',
    path: '/dashboard/alerts',
    icon: getIcon(alertCircleFill)
  }, */

  {
    title: 'Metrics',
    path: '/dashboard/metrics',
    icon: getIcon(pieChartFill)
  },

  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  }

  /* {
    title: 'Conocimiento',
    path: '/dashboard/knowledge',
    icon: <LiveHelpIcon />
  } */
];

export default sidebarConfig;
