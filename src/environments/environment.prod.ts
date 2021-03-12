export const environment = {
  production: true,
  mccapiUrl: window["env"]["apiServer"] || 'https://mcc-niddk-backend.wl.r.appspot.com',
  clientId: window["env"]["clientId"] || 'eec8d2d2-fb01-4b3c-809e-8b6feac595e8',
  testPatients: ['cc-pat-betsy', 'cc-pat-pnoelle']
};
