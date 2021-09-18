import {
  Badge,
  Bell,
  ClickableNotification,
  clientSettings,
  darken,
  defaultMagicBellTheme,
  EnablePushNotificationsButton,
  FloatingNotificationInbox,
  MagicBellContext,
  MagicBellProvider,
  NotificationContent,
  NotificationInbox,
  NotificationList,
  NotificationState,
  Popover,
  StyledNotificationContainer,
  Timestamp,
  toRGBA,
  useMagicBellEvent,
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

  it('exports the useMagicBellEvent hook', () => {
    expect(useMagicBellEvent).toBeDefined();
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

  it('exports the Badge component', () => {
    expect(Badge).toBeDefined();
  });

  it('exports the Bell component', () => {
    expect(Bell).toBeDefined();
  });

  it('exports the ClickableNotification component', () => {
    expect(ClickableNotification).toBeDefined();
  });

  it('exports the StyledNotificationContainer component', () => {
    expect(StyledNotificationContainer).toBeDefined();
  });

  it('exports the EnablePushNotificationsButton component', () => {
    expect(EnablePushNotificationsButton).toBeDefined();
  });

  it('exports the NotificationContent component', () => {
    expect(NotificationContent).toBeDefined();
  });

  it('exports the FloatingNotificationInbox component', () => {
    expect(FloatingNotificationInbox).toBeDefined();
  });

  it('exports the NotificationInbox component', () => {
    expect(NotificationInbox).toBeDefined();
  });

  it('exports the NotificationList component', () => {
    expect(NotificationList).toBeDefined();
  });

  it('exports the NotificationState component', () => {
    expect(NotificationState).toBeDefined();
  });

  it('exports the Popover component', () => {
    expect(Popover).toBeDefined();
  });

  it('exports the Timestamp component', () => {
    expect(Timestamp).toBeDefined();
  });

  it('exports the MagicBellContext component', () => {
    expect(MagicBellContext).toBeDefined();
  });

  it('exports the defaultMagicBellTheme constant', () => {
    expect(defaultMagicBellTheme).toBeDefined();
  });

  it('exports the darken constant', () => {
    expect(darken).toBeDefined();
  });

  it('exports the toRGBA constant', () => {
    expect(toRGBA).toBeDefined();
  });
});
