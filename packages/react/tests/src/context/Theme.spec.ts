import { defaultTheme } from '../../../src/context/Theme';

describe('Theme', () => {
  describe('defaultTheme', () => {
    it('defines default values for the bell icon', () => {
      expect(defaultTheme.icon).toEqual({ borderColor: '#5225C1', width: '24px' });
    });

    it('defines default values for the header', () => {
      expect(defaultTheme.header).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderColor: '#EFEEF1',
        borderRadius: '16px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '15px',
        fontWeight: 400,
        padding: '16px',
        textAlign: 'left',
        textColor: '#5225C1',
        textTransform: 'none',
      });
    });

    it('defines default values for the notifications container', () => {
      expect(defaultTheme.container).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderColor: 'transparent',
        borderRadius: '8px',
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.08), 0px 5px 12px rgba(0, 0, 0, 0.16)',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '16px',
        fontWeight: 'inherit',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
      });
    });

    it('defines default values for the footer', () => {
      expect(defaultTheme.footer).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderColor: '#EFEEF1',
        borderRadius: '16px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '12px',
        fontWeight: 400,
        padding: '8px 16px',
        textAlign: 'left',
        textColor: '#5225C1',
        textTransform: 'none',
      });
    });

    it('defines default values for the unseen badge', () => {
      expect(defaultTheme.unseenBadge).toEqual({
        backgroundColor: '#F80808',
        backgroundOpacity: 1,
        borderColor: 'white',
        borderRadius: '4px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '9px',
        fontWeight: 400,
        padding: '2px 3px',
        textAlign: 'center',
        textColor: 'white',
        textTransform: 'none',
      });
    });

    it('defines default values for the default state of a notification', () => {
      expect(defaultTheme.notification.default).toEqual({
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderRadius: '16px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '12px',
        fontWeight: 400,
        hover: { backgroundColor: '#F2EDFC', backgroundOpacity: 1 },
        margin: '8px',
        padding: '16px 8px',
        state: { color: 'transparent' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 600,
          textColor: '#181B20',
        },
      });
    });

    it('defines default values for the unread state of a notification', () => {
      expect(defaultTheme.notification.unread).toEqual({
        backgroundColor: '#F8F5FF',
        backgroundOpacity: 1,
        borderRadius: '16px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '12px',
        fontWeight: 400,
        hover: { backgroundColor: '#F2EDFC', backgroundOpacity: 1 },
        margin: '8px',
        padding: '16px 8px',
        state: { color: '#5225C1' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 600,
          textColor: '#181B20',
        },
      });
    });

    it('defines default values for the unseen state of a notification', () => {
      expect(defaultTheme.notification.unseen).toEqual({
        backgroundColor: '#F8F5FF',
        backgroundOpacity: 1,
        borderRadius: '16px',
        fontFamily:
          'Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system',
        fontSize: '12px',
        fontWeight: 400,
        hover: { backgroundColor: '#F2EDFC', backgroundOpacity: 1 },
        margin: '8px',
        padding: '16px 8px',
        state: { color: '#5225C1' },
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        title: {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 600,
          textColor: '#181B20',
        },
      });
    });
  });
});
