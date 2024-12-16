---
'@magicbell/magicbell-react': minor
---

Fixed an issue in arrow positioning, and provide a new prop `arrowPadding` to adjust the arrow position, for example to match border radius.

Provide the `offset` property, which accepts a `number` or an object with `mainAxis` and `crossAxis` properties, to position the inbox relative to it's trigger.

```jsx
<FloatingNotificationInbox height={450} {...props} placement="bottom-start" offset={24} arrowPadding={16} isOpen />
```
