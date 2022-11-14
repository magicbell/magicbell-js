---
'magicbell': minor
---

- Loads the axios http adapter when `XMLHttpRequest` is unsupported. This allows `magicbell` to be used in for example vscode extensions.
- Don't persist config if `os.homedir` is unavailable, which is for example the case in vscode extensions.
- Add support for authentication using `x-magicbell-user-external-id` header.
- Allow specifying the `userKey`. This allows users to use `magicbell`, without the need to provide the `apiSecret` key to generate the HMAC on runtime.
