import faker from 'faker';
// utils

// ----------------------------------------------------------------------

const plans = [
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA BERRIEL',
    created: '23/12/2021',
    objective: 'Belen Porcal',
    feedback: 'lorem ipsum',
    state: 'Guardado'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    created: '25/12/2021',
    objective: 'Ignacio Carranza (PO)',
    feedback: 'lorem ipsum',
    state: 'Envíado'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    created: '25/12/2021',
    objective: 'Ignacio Carranza (PO)',
    feedback: 'lorem ipsum',
    state: 'Firmado'
  }
];

export default plans;
