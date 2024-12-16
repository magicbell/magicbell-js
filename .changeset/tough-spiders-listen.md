---
'@magicbell/magicbell-react': minor
---

We fixed an issue in arrow positioning and provided a new prop, `arrowPadding,` to adjust the arrow position, for example, to match the border radius.

Provide the `offset` property, which accepts a `number` or an object with `mainAxis` and `crossAxis` properties, to position the inbox relative to its trigger.

```jsx
<FloatingNotificationInbox height={450} placement="bottom-start" offset={24} arrowPadding={16} {...props} />
```
