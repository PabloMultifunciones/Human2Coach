import faker from 'faker';
// utils

// ----------------------------------------------------------------------

const plans = [
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA BERRIEL',
    created: '23/12/2021',
    objective: 'X',
    feedback: 'X',
    state: 'Guardado'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    created: '25/12/2021',
    objective: 'X',
    feedback: 'X',
    state: 'Envíado'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    created: '25/12/2021',
    objective: 'X',
    feedback: 'X',
    state: 'Firmado'
  }
];

export default plans;
