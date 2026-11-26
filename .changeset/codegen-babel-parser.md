---
'@magicbell/codegen': patch
---

Add the missing `@babel/parser` dependency, which recast's TypeScript parser needs. Without it, importing `@magicbell/codegen`, `@magicbell/codegen/builders` or `@magicbell/codegen/recast` threw "Install @babel/parser".
