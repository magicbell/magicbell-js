---
'magicbell': major
---

We're now using [ky] instead of [axios] for making HTTP requests. This is a breaking change, as ky is build around the fetch module. Fetch is natively supported in all modern browsers, and is also available in Node.js since version 18.13.0.

If you're using an older version of node, we recommend you to upgrade to the latest LTS version. Alternatively, include a fetch polyfill such as [isomorphic-fetch].

[axios]: https://npmjs.com/axios
[ky]: https://npmjs.com/ky
[isomorphic-fetch]: https://npmjs.com/isomorphic-fetch
