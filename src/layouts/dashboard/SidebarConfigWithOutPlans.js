import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import { Translation } from 'react-i18next';

// import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
// import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SidebarConfigWithOutPlans = [
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
    title: <Translation>{(t) => <p>{t('my-collaborators', 'Mis colaboradores')}</p>}</Translation>,
    path: '/dashboard/plans',
    icon: getIcon(clipboardOutline)
  },

  {
    title: <Translation>{(t) => <p>{t('menu.rigth-list-item-users', 'Usuarios')}</p>}</Translation>,
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  }
];

export default SidebarConfigWithOutPlans;
