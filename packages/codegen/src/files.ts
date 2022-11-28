import fs from 'fs/promises';

export async function updateReadme(filePath: string, blockName: string, content: string | string[]) {
  const lines = await fs.readFile(filePath, 'utf-8').then((x) => x.split('\n'));
  const startIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:START (${blockName}) -->`);
  const endIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:END (${blockName}) -->`);
  lines.splice(
    startIdx + 1,
    endIdx - startIdx - 1,
    '',
    (Array.isArray(content) ? content : [content]).join('\n').trim(),
    '',
  );
  return fs.writeFile(filePath, lines.join('\n'), 'utf-8');
}
