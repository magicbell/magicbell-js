---
'@magicbell/magicbell-react': minor
---

Improved cjs/esm support by moving our build system to tshy. This change includes switching the floating inbox positioning from `@tippyjs/react` to `@floating-ui/react`, as the former would make it impossible to properly support both cjs and esm.

As part of this change, we no longer export internal properties like `popperOptions` or the internal `Popover` component.
