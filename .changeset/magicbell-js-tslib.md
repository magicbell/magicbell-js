---
'magicbell-js': patch
---

Add the missing `tslib` dependency. Without it, `require('magicbell-js/project-client')`, `require('magicbell-js/user-client')` and both forms of `magicbell-js/realtime` failed with "Cannot find module 'tslib'" unless another package happened to install it.
