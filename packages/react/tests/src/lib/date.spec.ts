import dayjs from 'dayjs';
import Sinon from 'sinon';
import '../../../src/lib/date';

describe('lib', () => {
  describe('date', () => {
    describe('"en" locale', () => {
      let clock: Sinon.SinonFakeTimers;

      beforeEach(() => {
        clock = Sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      describe('the date is from now', () => {
        it('returns "0s"', () => {
          const date = dayjs();
          expect(date.fromNow(true)).toBe('0s');
        });
      });

      describe('the date is from 40 seconds ago', () => {
        it('returns "40s"', () => {
          const date = dayjs();
          clock.tick(40_000);

          expect(date.fromNow(true)).toBe('40s');
        });
      });

      describe('the date is from 2 minutes ago', () => {
        it('returns "2m"', () => {
          const date = dayjs();
          clock.tick(100_000);

          expect(date.fromNow(true)).toBe('2m');
        });
      });

      describe('the date is from 3 hours ago', () => {
        it('returns "3h"', () => {
          const date = dayjs();
          clock.tick(10_000_000);

          expect(date.fromNow(true)).toBe('3h');
        });
      });

      describe('the date is from 1 day ago', () => {
        it('returns "1d"', () => {
          const date = dayjs();
          clock.tick(100_000_000);

          expect(date.fromNow(true)).toBe('1d');
        });
      });

      describe('the date is from 5 days ago', () => {
        it('returns "5d"', () => {
          const date = dayjs();
          clock.tick(400_000_000);

          expect(date.fromNow(true)).toBe('5d');
        });
      });

      describe('the date is from 2 months ago', () => {
        it('returns "2mo"', () => {
          const date = dayjs();
          clock.tick(100_000_000 * 60);

          expect(date.fromNow(true)).toBe('2mo');
        });
      });
    });
  });
});
