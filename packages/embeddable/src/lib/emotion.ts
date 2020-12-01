import createCache from '@emotion/cache';

export const cache = createCache({
  key: 'magicbell-embeddable',
  container: document.body,
});
