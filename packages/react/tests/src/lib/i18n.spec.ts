import '../../../src/lib/date';

import { useLocale } from '../../../src/lib/i18n';
import es from '../../../src/lib/translations/es';

describe('lib', () => {
  describe('i18n', () => {
    describe('.useLocale', () => {
      describe('use an existing locale', () => {
        it('returns default locales', () => {
          const locales = useLocale('es');

          expect(locales).toEqual(es);
        });
      });

      describe('extend an existing locale', () => {
        it('returns a custom locale based on the original', () => {
          const locales = useLocale({
            name: 'es',
            translations: { header: { title: 'Mis notificaciones' } },
          });

          expect(locales).toEqual({
            ...es,
            header: {
              'mark-all-read': 'Marcar todo como leído',
              title: 'Mis notificaciones',
            },
          });
        });
      });

      describe('add a new locale', () => {
        it('returns a new locale', () => {
          const locales = useLocale({
            name: 'en-US',
            translations: { header: { title: 'My Own Notifications' } },
          });

          expect(locales).toEqual({ header: { title: 'My Own Notifications' } });
        });
      });
    });
  });
});
