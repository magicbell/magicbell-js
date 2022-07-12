import { defaultTheme } from '../../../src/context/Theme';

describe('Theme', () => {
  describe('defaultTheme', () => {
    it('defines default values for the bell icon', () => {
      expect(defaultTheme.icon).toEqual({
        borderColor: '#3498F4',
        width: '24px',
      });
    });

    it('defines default values for the header', () => {
      expect(defaultTheme.header).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 1,
        borderColor: undefined,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        padding: '16px 24px',
        textAlign: 'left',
        textColor: 'white',
        textTransform: 'uppercase',
      });
    });

    it('defines default values for the notifications container', () => {
      expect(defaultTheme.container).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderRadius: '8px',
        boxShadow: '0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
      });
    });

    it('defines default values for the footer', () => {
      expect(defaultTheme.footer).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 1,
        borderColor: undefined,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        padding: '12px 24px',
        textAlign: 'left',
        textColor: 'white',
        textTransform: 'none',
      });
    });

    it('defines default values for the unseen badge', () => {
      expect(defaultTheme.unseenBadge).toEqual({
        backgroundColor: '#DF4759',
        backgroundOpacity: 1,
        borderRadius: '2px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '10px',
        fontWeight: 'inherit',
        textAlign: 'center',
        textColor: 'white',
        textTransform: 'none',
      });
    });

    it('defines default values for the default state of a notification', () => {
      expect(defaultTheme.notification.default).toEqual({
        backgroundColor: 'transparent',
        backgroundOpacity: 0,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        hover: { backgroundColor: '#3498F4', backgroundOpacity: 0.1 },
        margin: '4px',
        padding: '16px 20px 16px 12px',
        state: { color: 'transparent' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 500,
          textColor: 'inherit',
        },
      });
    });

    it('defines default values for the unread state of a notification', () => {
      expect(defaultTheme.notification.unread).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 0,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        hover: { backgroundColor: '#3498F4', backgroundOpacity: 0.1 },
        margin: '4px',
        padding: '16px 20px 16px 12px',
        state: { color: '#3498F4' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 500,
          textColor: 'inherit',
        },
      });
    });

    it('defines default values for the unseen state of a notification', () => {
      expect(defaultTheme.notification.unseen).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 0.05,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        fontWeight: 'inherit',
        hover: { backgroundColor: '#3498F4', backgroundOpacity: 0.1 },
        margin: '4px',
        padding: '16px 20px 16px 12px',
        state: { color: '#3498F4' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 500,
          textColor: 'inherit',
        },
      });
    });
  });
});
