import fs from 'fs/promises';

export async function updateReadme(filePath: string, blockName: string, content: string | string[]) {
  const lines = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => '')
    .then((x) => x.split('\n'));

  const startComment = `<!-- AUTO-GENERATED-CONTENT:START (${blockName}) -->`;
  const endComment = `<!-- AUTO-GENERATED-CONTENT:END (${blockName}) -->`;

  if (!lines.includes(startComment) || !lines.includes(endComment)) {
    lines.push('', startComment, '', endComment, '');
  }

  const startIdx = lines.indexOf(startComment);
  const endIdx = lines.indexOf(endComment);
  lines.splice(
    startIdx + 1,
    endIdx - startIdx - 1,
    '',
    (Array.isArray(content) ? content : [content]).join('\n').trim(),
    '',
  );

  return fs.writeFile(filePath, lines.join('\n'), 'utf-8');
}
