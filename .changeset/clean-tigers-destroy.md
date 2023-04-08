---
'@magicbell/react-headless': patch
---

The documentation example for useBell was throwing a type error when implementing. Looking at the source code, it should pass an object with key storeId, instead of straight up giving the string
