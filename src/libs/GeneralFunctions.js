import { format } from 'date-fns';

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

  getRole(role) {
    if (role === 2) {
      return 'Supervisor';
    }

    if (role === 3) {
      return 'Player';
    }
    return 'N/A';
  },

  formatPropsEdit(array) {
    const arrayFormatted = [];
    array.forEach((element) => {
      arrayFormatted.push(element.id);
    });
    return arrayFormatted;
  }
};
