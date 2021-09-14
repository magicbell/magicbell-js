import {
  clientSettings,
  deleteAPI,
  fetchAPI,
  MagicBellProvider,
  postAPI,
  putAPI,
  RealtimeListener,
  secondsToDate,
  toDate,
  toUnix,
  useBell,
  useNotification,
  useNotificationPreferences,
  useNotifications,
  useNotificationStoresCollection,
  useNotificationUnmount,
} from '../../src';

describe('index.ts', () => {
  it('exports the clientSettings store', () => {
    expect(clientSettings).toBeDefined();
  });

  it('exports the useBell hook', () => {
    expect(useBell).toBeDefined();
  });

  it('exports the useNotification hook', () => {
    expect(useNotification).toBeDefined();
  });

  it('exports the useNotifications hook', () => {
    expect(useNotifications).toBeDefined();
  });

  it('exports the useNotificationStoresCollection hook', () => {
    expect(useNotificationStoresCollection).toBeDefined();
  });

  it('exports the useNotificationUnmount hook', () => {
    expect(useNotificationUnmount).toBeDefined();
  });

  it('exports the useNotificationPreferences hook', () => {
    expect(useNotificationPreferences).toBeDefined();
  });

  it('exports the MagicBellProvider component', () => {
    expect(MagicBellProvider).toBeDefined();
  });

  it('exports the RealtimeListener component', () => {
    expect(RealtimeListener).toBeDefined();
  });

  it('exports the deleteAPI function', () => {
    expect(deleteAPI).toBeDefined();
  });

  it('exports the fetchAPI function', () => {
    expect(fetchAPI).toBeDefined();
  });

  it('exports the postAPI function', () => {
    expect(postAPI).toBeDefined();
  });

  it('exports the putAPI function', () => {
    expect(putAPI).toBeDefined();
  });

  it('exports the toDate function', () => {
    expect(toDate).toBeDefined();
  });

  it('exports the toUnix function', () => {
    expect(toUnix).toBeDefined();
  });

  it('exports the secondsToDate function', () => {
    expect(secondsToDate).toBeDefined();
  });
});
