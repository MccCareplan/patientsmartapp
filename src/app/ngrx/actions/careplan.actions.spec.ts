import * as fromCareplan from './careplan.actions';

describe('loadCareplans', () => {
  it('should return an action', () => {
    expect(fromCareplan.loadCareplans().type).toBe('[Careplan] Load Careplans');
  });
});
