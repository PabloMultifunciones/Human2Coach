import { getWeek, format, subDays, startOfWeek } from 'date-fns';
import { Icon } from '@iconify/react';

import pieChartFill from '@iconify/icons-eva/pie-chart-fill';
import usersIcon from '@iconify/icons-icomoon-free/users';
import calendarIcon from '@iconify/icons-icomoon-free/calendar';
import userCheck from '@iconify/icons-icomoon-free/user-check';

export default {
  validateEmail(valor) {
    if (
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
        valor
      )
    ) {
      return true;
    }
    return false;
  },

  deleteDuplicates(arr, prop) {
    const newArray = [];
    const lookup = {};

    let n = 0;
    for (n in arr) {
      if (n) {
        lookup[arr[n][prop]] = arr[n];
      }
    }

    let l = 0;
    for (l in lookup) {
      if (l) {
        newArray.push(lookup[l]);
      }
    }

    return newArray;
  },

  addZero(i) {
    if (i < 10) {
      i = `0${i}`;
    }
    return i;
  },

  formatDate(date) {
    const hours = this.addZero(date.getHours());
    const minutes = this.addZero(date.getMinutes());
    const seconds = this.addZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  },

  formatNewDate(date, lang) {
    if (date) {
      return format(new Date(date), 'dd/MMM/yyyy', {
        locale: lang
      });
    }
    return 'N/A';
  },

  compareDateWithActualDate(date) {
    const d1 = new Date();
    const d2 = new Date(date);

    if (d2 < d1) {
      return false;
    }

    return true;
  },

  getRole(position) {
    if (position === 1) {
      return 'Team Manager';
    }

    if (position === 2) {
      return 'Team Leader';
    }

    if (position === 3) {
      return 'Collaborator';
    }
    return 'N/A';
  },

  formatPropsEdit(array) {
    const arrayFormatted = [];
    array.forEach((element) => {
      arrayFormatted.push(element.id);
    });
    return arrayFormatted;
  },

  getNameSession() {
    if (localStorage.getItem('sesion')) {
      const sesion = JSON.parse(localStorage.getItem('sesion'));

      if (sesion.user.name) {
        return `${sesion.user.name} ${sesion.user.lastName}`;
      }

      return 'usuario';
    }
    return '';
  },

  getIcon(title) {
    if (title === 'One on One') {
      return <Icon icon={usersIcon} width={30} height={30} className="mr-1" />;
    }

    if (title === 'PDS') {
      return <Icon icon={calendarIcon} width={30} height={30} className="mr-1" />;
    }

    if (title === 'PIP') {
      return <Icon icon={userCheck} width={30} height={30} className="mr-1" />;
    }
    return <Icon icon={pieChartFill} width={30} height={30} className="mr-1" />;
  },

  getWeekCount() {
    const count = getWeek(new Date()) - 1;

    if (count === 1) {
      return getWeek(new Date()) - 1;
    }
    return 1;
  },

  getWeekCountBefore() {
    const count = getWeek(subDays(startOfWeek(new Date()), 7)) - 1;
    if (count === 1) {
      return getWeek(subDays(startOfWeek(new Date()), 7)) - 1;
    }
    return 1;
  }
};
