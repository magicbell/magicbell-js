/* eslint-disable no-restricted-globals */

/**
 * Open a centered popup window.
 *
 * @param url Url of the floating window
 */
export function openWindow(url: string) {
  const top = (screen.height - 400) / 4;
  const left = (screen.width - 600) / 2;
  window.open(url, '', `width=600,height=400,scrollbars=no,top=${top},left=${left}`);
}
