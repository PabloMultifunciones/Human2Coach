import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';

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
    title: 'Chat con empleados',
    path: '/dashboard/boss/chat',
    icon: getIcon(messageCircleFill)
  },

  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },

  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },

  {
    title: 'Reporte Seg. individual',
    path: '/dashboard/report-individual-follow',
    icon: getIcon(clipboardOutline)
  },
  {
    title: 'Ingreso seg. individual',
    path: '/dashboard/entry-individual-follow',
    icon: getIcon(clipboardOutline)
  }
];

export default sidebarConfig;
