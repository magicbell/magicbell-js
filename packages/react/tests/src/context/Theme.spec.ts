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
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        textAlign: 'left',
        textColor: 'white',
        textTransform: 'none',
      });
    });

    it('defines default values for the notifications container', () => {
      expect(defaultTheme.container).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
      });
    });

    it('defines default values for the footer', () => {
      expect(defaultTheme.footer).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 1,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
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
        textAlign: 'center',
        textColor: 'white',
        textTransform: 'none',
      });
    });

    it('defines default values for the default state of a notification', () => {
      expect(defaultTheme.notification.default).toEqual({
        backgroundColor: '#3498F4',
        backgroundOpacity: 0.1,
        borderRadius: '8px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '14px',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
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
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
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
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
      });
    });
  });
});
