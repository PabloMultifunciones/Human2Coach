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
    description: 'Plan de seguimiento'
  },
  {
    id: faker.datatype.uuid(),
    tm: 'DAHIANA ORTEGA',
    teamLead: 'AGUSTINA',
    agent: 'Ignacio Carranza (PO)',
    state: true,
    description: 'Plan de seguimiento'
  }
];

export default users;
