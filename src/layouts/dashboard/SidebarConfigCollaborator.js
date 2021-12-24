import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import { Translation } from 'react-i18next';

// import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
// import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SidebarConfigCollaborator = [
  {
    title: (
      <Translation>
        {(t) => <p>{t('admin.header-dashboard', 'Panel de administración')}</p>}
      </Translation>
    ),
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },

  {
    title: <Translation>{(t) => <p>{t('plans', 'Planes')}</p>}</Translation>,
    path: '/dashboard/plans',
    icon: getIcon(clipboardOutline)
  }
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

  /* {
    title: 'Conocimiento',
    path: '/dashboard/knowledge',
    icon: <LiveHelpIcon />
  } */
];

export default SidebarConfigCollaborator;
