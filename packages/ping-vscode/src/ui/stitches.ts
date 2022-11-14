import { createStitches } from '@stitches/react';

export const { styled, globalCss } = createStitches({
  media: {
    sm: '(min-width: 0px)',
    md: '(min-width: 200px)',
    lg: '(min-width: 240px)',
  },
});

// see: https://code.visualstudio.com/api/references/theme-color
// note vars from that link get prefixed with vscode and replace the . with -.
// For example editor.foreground becomes var(--vscode-editor-foreground):
export const theme = {
  foreground: 'var(--vscode-foreground)',
  disabledForeground: 'var(--vscode-disabledForeground)',
  errorForeground: 'var(--vscode-errorForeground)',
  descriptionForeground: 'var(--vscode-descriptionForeground)',
  focusBorder: 'var(--vscode-focusBorder)',

  font: { family: 'var(--vscode-font-family)' },
  icon: { foreground: 'var(--vscode-icon-foreground)' },
  sideBar: {
    background: 'var(--vscode-sideBar-background)',
  },
  notifications: {
    foreground: 'var(--vscode-notifications-foreground)',
    background: 'var(--vscode-notifications-background)',
    border: 'var(--vscode-notifications-border)',
  },
  notificationLink: {
    foreground: 'var(--vscode-notificationLink-foreground)',
  },
  notificationsErrorIcon: {
    foreground: 'var(--vscode-notificationsErrorIcon-foreground)',
  },
  notificationsWarningIcon: {
    foreground: 'var(--vscode-notificationsWarningIcon-foreground)',
  },
  notificationsInfoIcon: {
    foreground: 'var(--vscode-notificationsInfoIcon-foreground)',
  },
  button: {
    foreground: 'var(--vscode-button-foreground)',
    separator: 'var(--vscode-button-separator)',
    background: 'var(--vscode-button-background)',
    hoverBackground: 'var(--vscode-button-hoverBackground)',
    secondaryForeground: 'var(--vscode-button-secondaryForeground)',
    secondaryBackground: 'var(--vscode-button-secondaryBackground)',
    secondaryHoverBackground: 'var(--vscode-button-secondaryHoverBackground)',
  },
  list: {
    focusOutline: 'var(--vscode-list-focusOutline)',
    activeSelectionBackground: 'var(--vscode-list-activeSelectionBackground)',
    activeSelectionForeground: 'var(--vscode-list-activeSelectionForeground)',
    activeSelectionIconForeground: 'var(--vscode-list-activeSelectionIconForeground)',
    inactiveSelectionBackground: 'var(--vscode-list-inactiveSelectionBackground)',
    hoverBackground: 'var(--vscode-list-hoverBackground)',
    dropBackground: 'var(--vscode-list-dropBackground)',
    highlightForeground: 'var(--vscode-list-highlightForeground)',
    focusHighlightForeground: 'var(--vscode-list-focusHighlightForeground)',
    invalidItemForeground: 'var(--vscode-list-invalidItemForeground)',
    errorForeground: 'var(--vscode-list-errorForeground)',
    warningForeground: 'var(--vscode-list-warningForeground)',
  },
};

export const globalStyles = globalCss({
  '*, *::before, *::after': { margin: 0, padding: 0, boxSizing: 'border-box' },

  body: {
    fontFamily: theme.font.family,
    color: theme.foreground,
    padding: 0,
  },
});
