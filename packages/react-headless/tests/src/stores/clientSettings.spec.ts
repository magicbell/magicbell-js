import clientSettings from '../../../src/stores/clientSettings';

describe('stores', () => {
  describe('clientSettings', () => {
    describe('defaults', () => {
      it('does not have default values for the authentication values', () => {
        const { apiKey, apiSecret, userEmail, userExternalId, userKey } = clientSettings.getState();

        expect(apiKey).toEqual('');
        expect(apiSecret).toBeUndefined();
        expect(userEmail).toBeUndefined();
        expect(userExternalId).toBeUndefined();
        expect(userKey).toBeUndefined();
      });

      it('generates a value for the client ID', () => {
        const { clientId } = clientSettings.getState();
        expect(clientId).toBeDefined();
      });

      it('has a default value for the server url', () => {
        const { serverURL } = clientSettings.getState();
        expect(serverURL).toEqual('https://api.magicbell.com');
      });
    });
  });
});
