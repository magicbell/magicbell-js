import createInstance from '@emotion/css/create-instance';

export const { cache, css, cx } = createInstance({
  key: 'magicbell-embeddable',
  container: document.body,
});
