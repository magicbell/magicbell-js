---
'magicbell': minor
---

Add `broadcasts.create` method to the project client.

```js
await magicbell.broadcasts.create({
  title: "We're processing your order",
  content: "<p>Thank you for your order. We'll notify you when these items are ready.</p>",
  category: 'order_created',
  topic: 'order:33098',
  recipients: [
    {
      email: 'dan@example.com',
    },
    {
      external_id: '83d987a-83fd034',
      first_name: 'Person',
      last_name: 'Doe',
      custom_attributes: {
        plan: 'enterprise',
        pricing_version: 'v10',
        preferred_pronoun: 'They',
      },
      phone_numbers: ['+1 5005550001'],
    },
  ],
});
```
