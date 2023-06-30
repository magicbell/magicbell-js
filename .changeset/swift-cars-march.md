---
'@magicbell/cli': minor
---

Add `--max-items` to methods supporting `--paginate`. This way it's trivial to auto paginate over records at MagicBell, till a certain reasonable limit is reached. By default, `--paginate` iterates over every single record potentially hitting, but respecting, API rate limits.

```shell
$ magicbell broadcasts list --paginate --max-items 1000
```
