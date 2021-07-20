import faker from 'faker';
// utils

// ----------------------------------------------------------------------

const users = [
  {
    id: faker.datatype.uuid(),
    tm: 'DAHIANA BERRIEL',
    teamLead: 'AGUSTINA',
    agent: 'Belen Porcal',
    state: true,
    january: 'ONE on one',
    february: 'Plan de seguimiento'
  },
  {
    id: faker.datatype.uuid(),
    tm: 'DAHIANA BERRIEL',
    teamLead: 'AGUSTINA',
    agent: 'Ignacio Carranza (PO)',
    state: true,
    january: 'ONE on one',
    february: 'Plan de seguimiento'
  }
];

export default users;
