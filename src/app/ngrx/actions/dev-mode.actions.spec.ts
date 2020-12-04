import * as fromDevMode from './dev-mode.actions';

describe('loadDevModes', () => {
  it('should return an action', () => {
    expect(fromDevMode.loadDevModes().type).toBe('[DevMode] Load DevModes');
  });
});
