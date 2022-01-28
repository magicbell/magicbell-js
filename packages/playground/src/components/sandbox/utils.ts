export function minIndent(string) {
  const match = string.match(/^[ \t]*(?=\S)/gm);

  if (!match) {
    return 0;
  }

  return match.reduce((r, a) => Math.min(r, a.length), Infinity);
}

export function stripIndent(string) {
  const indent = minIndent(string);

  if (indent === 0) {
    return string;
  }

  const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');

  return string.replace(regex, '');
}
