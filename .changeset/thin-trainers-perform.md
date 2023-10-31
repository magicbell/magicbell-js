---
'@magicbell/cli': minor
---

Add `magicbell broadcasts create` command.

```shell
magicbell broadcasts create  \
  --title 'We\'re processing your order'  \
  --content '<p>Thank you for your order. We\'ll notify you when these items are ready.</p>'  \
  --category 'order_created'  \
  --topic 'order:33098'  \
  --recipients 'dan@example.com'
```
