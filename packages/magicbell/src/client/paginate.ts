import { hasOwn } from '../lib/utils';

export const ASYNC_ITERATOR_SYMBOL =
  typeof Symbol !== 'undefined' && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';

function hasMore(pageResult, nodeCount: number) {
  if (!hasOwn(pageResult, 'current_page') || !hasOwn(pageResult, 'per_page')) {
    return false;
  }

  if (hasOwn(pageResult, 'total_pages')) {
    return pageResult.current_page < pageResult.total_pages;
  }

  return nodeCount === pageResult.per_page;
}

export function autoPaginate(makeRequest, { data, params }) {
  const promiseCache = { currentPromise: null };
  const reverseIteration = typeof params.after !== 'undefined';

  let i = 0;
  let request = makeRequest({ data, params });

  const getNextPage = (pageResult) => {
    const page = pageResult.current_page + 1;
    return makeRequest({ data, params: { ...params, page } });
  };

  function iterate(pageResult) {
    const dataKey = Object.keys(pageResult).find((key) => Array.isArray(pageResult[key]));
    const data = pageResult[dataKey] || pageResult.data;

    if (!data || typeof data.length !== 'number') {
      throw Error('Unexpected: MagicBell API response does not have a well-formed response.');
    }

    if (i < data.length) {
      const idx = reverseIteration ? data.length - 1 - i : i;
      const value = data[idx];
      i += 1;

      return { value, done: false };
    }

    if (hasMore(pageResult, data.length)) {
      // Reset counter, request next page, and recurse.
      i = 0;
      request = getNextPage(pageResult);
      return request.then(iterate);
    }

    return { value: undefined, done: true };
  }

  function asyncIteratorNext() {
    return memoizedPromise(promiseCache, (resolve, reject) => {
      return request.then(iterate).then(resolve).catch(reject);
    });
  }

  const forEach = makeForEach(asyncIteratorNext);
  const toArray = makeToArray(forEach);

  const autoPaginationMethods = {
    forEach,
    toArray,

    next: asyncIteratorNext,
    return: () => ({}),
    [ASYNC_ITERATOR_SYMBOL]: () => {
      return autoPaginationMethods;
    },
  };

  return Object.assign(request, autoPaginationMethods);
}

/**
 * If a user calls `.next()` multiple times in parallel,
 * return the same result until something has resolved
 * to prevent page-turning race conditions.
 */
function memoizedPromise(promiseCache, cb) {
  if (promiseCache.currentPromise) {
    return promiseCache.currentPromise;
  }
  promiseCache.currentPromise = new Promise(cb).then((ret) => {
    promiseCache.currentPromise = undefined;
    return ret;
  });
  return promiseCache.currentPromise;
}

export function makeForEach(asyncIteratorNext, onDoneCallback?: () => void) {
  return function forEach(onItem) {
    return new Promise<void>((resolve, reject) => {
      let idx = 0;
      function handleIteration(iterResult) {
        if (iterResult.done) {
          resolve();
          return;
        }

        const item = iterResult.value;
        return new Promise((resolve) => {
          resolve(onItem(item, idx));
        }).then((shouldContinue) => {
          if (shouldContinue === false) {
            onDoneCallback?.();
            return handleIteration({ done: true });
          } else {
            idx++;
            return asyncIteratorNext().then(handleIteration);
          }
        });
      }

      asyncIteratorNext().then(handleIteration).catch(reject);
    });
  };
}

function makeToArray(forEach) {
  return function toArray(options) {
    const limit = options?.limit;
    if (!limit) {
      throw Error('You must pass a `limit` option to toArray, e.g., `toArray({ limit: 1000 });`.');
    }

    if (limit > 10_000) {
      throw Error(
        'You cannot specify a limit of more than 10,000 items to fetch in `toArray`; use `forEach` to iterate through longer lists.',
      );
    }

    return new Promise((resolve, reject) => {
      const items = [];
      forEach((item) => {
        items.push(item);
        if (items.length >= limit) {
          return false;
        }
      })
        .then(() => {
          resolve(items);
        })
        .catch(reject);
    });
  };
}
