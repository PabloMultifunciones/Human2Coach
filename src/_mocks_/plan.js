import faker from 'faker';
// utils

// ----------------------------------------------------------------------

const plans = [
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    sent: '25/12/2021',
    commitment: '25/12/2021',
    objective: 'X',
    feedback: 'X',
    mode: 'One on One',
    state: 'Envíado'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA ORTEGA',
    sent: '25/12/2021',
    commitment: '25/12/2021',
    objective: 'X',
    feedback: 'X',
    mode: 'PDS',
    state: 'Recibido'
  },
  {
    id: faker.datatype.uuid(),
    collaborator: 'DAHIANA BERRIEL',
    sent: '23/12/2021',
    commitment: '25/12/2021',
    objective: 'X',
    feedback: 'X',
    mode: 'PIP',
    state: 'Guardado'
  }
];

export default plans;
