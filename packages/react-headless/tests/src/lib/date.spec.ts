import dayjs from 'dayjs';
import { secondsToDate } from '../../../src/lib/date';

describe('lib', () => {
  describe('date', () => {
    describe('.secondsToDate', () => {
      describe('the number of seconds is null', () => {
        it('returns null', () => {
          const date = secondsToDate(null);
          expect(date).toBeNull();
        });
      });

      describe('the number of seconds is not null', () => {
        it('returns a date', () => {
          const date = secondsToDate(1599294223);
          expect(date).toBeInstanceOf(dayjs);
        });
      });
    });
  });
});
