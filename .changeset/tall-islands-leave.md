---
'@magicbell/cli': patch
---

Improve `--help` by being more specific about the json type some arguments expect. For example, we used to show `--overrides <json>`, but json can also be an array, while we do expect an object. Now, those arguments are shown as `<object>`.
