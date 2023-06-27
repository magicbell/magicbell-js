import { ESLint } from 'eslint';
import path from 'path';
import prettier from 'prettier';
import prettyMarkdown from 'prettier/parser-markdown';

export function formatMarkdown(document) {
  return prettier.format(document, {
    parser: 'markdown',
    plugins: [prettyMarkdown],
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 2,
  });
}

const eslint = new ESLint({
  fix: true,
  useEslintrc: true,
  cwd: path.join(process.cwd(), '../..'),
  overrideConfig: {
    rules: {
      'prettier/prettier': ['error', { parser: 'typescript' }],
    },
  },
});

export async function formatCode(code: string) {
  return eslint.lintText(code).then((x) => {
    if (x[0].messages?.length) {
      // eslint-disable-next-line no-console
      console.log('CODE ERRORS:');
      // eslint-disable-next-line no-console
      console.dir(
        {
          t: typeof code,
          messages: x[0].messages,
          code: code
            .split('\n')
            .map((x, idx, all) => `${String(idx + 1).padStart(String(all.length).length, ' ')} ${x}`)
            .join('\n'),
        },
        { depth: null },
      );
    }

    return x[0].output || code;
  });
}

export function wrapText(text, width = 80) {
  return text
    .replace(new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g'), '$1\n')
    .split('\n')
    .map((x) => x.trim())
    .join('\n');
}

export function capitalize(str: string) {
  return str
    .split(/[_\-\s]/)
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ');
}

export function camelCase(str: string) {
  return str[0].toLowerCase() + str.slice(1).replace(/[_-](\w)/g, (g) => g[1].toUpperCase());
}

export function pascalCase(str: string) {
  return str[0].toUpperCase() + camelCase(str).slice(1);
}

export function hyphenCase(str: string) {
  return (
    str[0].toLowerCase() +
    str
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/_/g, '-')
      .slice(1)
  );
}

export function snakeCase(str: string) {
  return (
    str[0].toLowerCase() +
    str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/-/g, '_')
      .slice(1)
  );
}
