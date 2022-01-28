import { SandpackTheme } from '@codesandbox/sandpack-react';

export const theme: SandpackTheme = {
  palette: {
    activeText: 'inherit',
    defaultText: 'inherit',
    inactiveText: 'inherit',
    activeBackground: 'inherit',
    defaultBackground: 'inherit',
    inputBackground: 'inherit',
    accent: 'inherit',
    errorBackground: 'inherit',
    errorForeground: 'inherit',
  },
  syntax: {
    plain: 'var(--theme-plain)',
    comment: 'var(--theme-comment)',
    keyword: 'var(--theme-keyword)',
    tag: 'var(--theme-tag)',
    punctuation: 'var(--theme-punctuation)',
    definition: 'var(--theme-definition)',
    property: 'var(--theme-property)',
    static: 'var(--theme-static)',
    string: 'var(--theme-string)',
  },
  typography: {
    bodyFont: '"Ubuntu", "arial"',
    monoFont: '"Ubuntu Mono", "courier new"',
    fontSize: '14px',
    lineHeight: '24px',
  },
};

export const classes = {
  'sb-layout': 'pg-layout',
};
