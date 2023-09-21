import { mockHandler } from '../mock-server';

export const ablyAuth = mockHandler('post', 'https://api.magicbell.com/ably/auth', {
  keyName: 'rerP7g.9NH_TA',
  timestamp: Date.now(),
  nonce: '2a0c905cee50b30bba86c1ad92f523d6',
  clientId: '4450',
  capability: '{"user_4450-project_18":["*"],"user_4450-project_18:*":["*"]}',
  mac: 'L8ezYmgnM9Mp4yYJHYIPqTH+WsyY0r6pr4AcIyqJzSU=',
});

export const ablyRequestToken = mockHandler('post', 'https://rest.ably.io/keys/:key/requestToken', {
  token:
    'v3o19Q.GEfb3flEHPw3J6wH88hs_thOxzFR2wB60_FUbazFHznlmNvF9iOri4hQT_kUIG7oBZCrlJtfpHsyG4aZnoRmyhN_4N7YfTu5kXjVGL8UPwXBLJXp9gn_9uykw5hPmjphBTtC81DasytTbNfI3I7eNYXNGBVdwwKW1zsrhpJM_L2dZVysU6ERZ0P_b2_cMq9eA',
  keyName: 'rerP7g.9NH_TA',
  issued: Date.now(),
  expires: Date.now() + 500000,
  capability: '{"user_4450-project_18":["*"],"user_4450-project_18:*":["*"]}',
  clientId: '4450',
});
