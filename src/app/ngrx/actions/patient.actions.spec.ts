import * as fromPatient from './patient.actions';

describe('loadPatients', () => {
  it('should return an action', () => {
    expect(fromPatient.loadPatients().type).toBe('[Patient] Load Patients');
  });
});
