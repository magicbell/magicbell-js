---
'@magicbell/react-headless': patch
---

fix: initialize stores in an effect instead of lazy use-state.

This solves an "cannot update component" warning that was thrown in development mode.
