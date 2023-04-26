---
'@magicbell/magicbell-react': minor
---

feat: Add support for theming the enable-push-subscriptions dialog.
.

```typescript jsx
const theme = {
  dialog: {
    backgroundColor: '#FFFFFF',
    textColor: '#3A424D',
    accentColor: '#5225C1',
  }
}

<MagicBell theme={theme} apiKey={...} userEmail={...}>
    {() => <NotificationInbox height={500} />}
</MagicBell>
```
