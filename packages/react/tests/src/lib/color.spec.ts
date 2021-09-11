import { darken, toRGBA } from '../../../src/lib/color';

describe('lib', () => {
  describe('date', () => {
    describe('.toRGBA', () => {
      describe('the color is in hex format', () => {
        it('returns an rgba representation of the color', () => {
          const colorStr = toRGBA('#32a852', 0.54);
          expect(colorStr).toBe('rgba(50, 168, 82, 0.54)');
        });
      });

      describe('the color is in rgb format', () => {
        it('returns an rgba representation of the color', () => {
          const colorStr = toRGBA('rgb(61, 150, 49)', 0.54);
          expect(colorStr).toBe('rgba(61, 150, 49, 0.54)');
        });
      });

      describe('the color is in HSV format', () => {
        it('returns an rgba representation of the color', () => {
          const colorStr = toRGBA('hsv(136, 70, 66)', 0.2);
          expect(colorStr).toBe('rgba(50, 168, 82, 0.2)');
        });
      });

      describe('the color is incorrect', () => {
        it('returns an rgba representation of the black color', () => {
          const colorStr = toRGBA('rgb()', 0.2);
          expect(colorStr).toBe('rgba(0, 0, 0, 0.2)');
        });
      });

      describe('the alpha is "0"', () => {
        it('returns an rgba representation of the color', () => {
          const colorStr = toRGBA('#FFFFFF', 0);
          expect(colorStr).toBe('rgba(255, 255, 255, 0)');
        });
      });
    });

    describe('.darken', () => {
      describe('the amount of black to mix with is 0', () => {
        it('returns an rgb representation of the given color', () => {
          const colorStr = darken('#32a852', 0);
          expect(colorStr).toBe('rgb(25, 84, 41)');
        });
      });

      describe('the amount of black to mix with greater than 0', () => {
        it('returns an rgb representation of the given color mixed with black', () => {
          const colorStr = darken('#32a852', 5);
          expect(colorStr).toBe('rgb(48, 160, 78)');
        });
      });
    });
  });
});
