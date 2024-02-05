---
'@magicbell/react-headless': minor
---

Add archive and unarchive utilities to the `useNotification` hook.

```js
const notification = useNotification(data);

await notification.archive();
await notification.unarchive();
```

Archived notifications are not included in the default notification store. Create a separate store for archived notifications if you want to display them.

```tsx
const stores = [
  { id: 'default', defaultQueryParams: {} },
  { id: 'archived', defaultQueryParams: { archived: true } },
];

const tabs = [
  { storeId: 'default', label: 'Latest' },
  { storeId: 'archived', label: 'Archive' },
];

export default function Index() {
  return (
    <MagicBell apiKey="__MAGICBELL_API_KEY__" userEmail="__MAGICBELL_USER_EMAIL__" stores={stores}>
      {(props) => <FloatingNotificationInbox height={450} tabs={tabs} {...props} />}
    </MagicBell>
  );
}
```
