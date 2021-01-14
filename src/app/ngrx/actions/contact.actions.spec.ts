import * as fromContact from './contact.actions';

describe('loadContacts', () => {
  it('should return an action', () => {
    expect(fromContact.loadContacts().type).toBe('[Contact] Load Contacts');
  });
});
