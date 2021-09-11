import tinycolor from 'tinycolor2';

/**
 * Function that takes a valid CSS color and adds some opacity to it.
 *
 * @param baseColor Color in HSL, HSV, HEX or RGB
 * @param alpha Alpha for this color
 */
export function toRGBA(baseColor: string, alpha: number) {
  const color = tinycolor(baseColor);
  color.setAlpha(alpha);

  return color.toRgbString();
}

/**
 * Function that takes a valid CSS color and mixes it with black.
 *
 * @param baseColor Color in HSL, HSV, HEX or RGB
 * @param amount Amount of black to mix with the base color.
 */
export function darken(baseColor: string, amount?: number) {
  return tinycolor.mix(baseColor, 'black', amount || 50).toRgbString();
}
