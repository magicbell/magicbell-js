import Configstore from 'configstore';

export const configStore = new Configstore(
  'magicbell',
  {
    apiKey: '',
    apiSecret: '',
  },
  {
    globalConfigPath: true,
  },
);
