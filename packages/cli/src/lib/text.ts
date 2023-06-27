export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelToHyphenCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function hyphenToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function mask(string) {
  if (!string || typeof string !== 'string') return string;

  const minMaskLength = 5;
  const maxVisibleLength = 5;

  const visibleLength = Math.min(maxVisibleLength, Math.max(0, Math.floor((string.length - minMaskLength) / 2)));
  if (visibleLength === 0) return '*'.repeat(minMaskLength);

  return [
    string.slice(0, visibleLength),
    '*'.repeat(string.length - visibleLength * 2),
    string.slice(-visibleLength),
  ].join('');
}
