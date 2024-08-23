import fs from 'fs/promises';

export function replaceBlock(contents: string, block: string, replacement: string | string[]): string {
  const lines = contents.split('\n');

  const startComment = `<!-- AUTO-GENERATED-CONTENT:START (${block}) -->`;
  const endComment = `<!-- AUTO-GENERATED-CONTENT:END (${block}) -->`;

  if (!lines.includes(startComment) || !lines.includes(endComment)) {
    lines.push('', startComment, '', endComment, '');
  }

  const startIdx = lines.indexOf(startComment);
  const endIdx = lines.indexOf(endComment);
  lines.splice(
    startIdx + 1,
    endIdx - startIdx - 1,
    '',
    (Array.isArray(replacement) ? replacement : [replacement]).join('\n').trim(),
    '',
  );

  return lines.join('\n');
}

export async function updateReadme(filePath: string, blockName: string, content: string | string[]) {
  let readme = await fs.readFile(filePath, 'utf-8').catch(() => '');
  readme = replaceBlock(readme, blockName, content);
  return fs.writeFile(filePath, readme, 'utf-8');
}
