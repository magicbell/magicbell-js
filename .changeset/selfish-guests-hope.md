---
'@magicbell/cli': major
---

**Breaking Change**!

We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

If you make use of the `categories` or `topics` filters on `magicbell user notifications`, you'll need to rename them to their singular variants.

```diff
- magicbell user notifications list --topics support
+ magicbell user notifications list --topic support

- magicbell user notifications mark-all-read --topics billing
+ magicbell user notifications mark-all-read --topic billing

- magicbell user notifications mark-all-seen --topics other
+ magicbell user notifications mark-all-seen --topic other
```
