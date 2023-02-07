---
'@magicbell/magicbell-react': minor
---

feat: category labels in the preferences pane are now translatable.

```typescript jsx
const customLocale = {
  name: 'en',
  translations: {
    preferences: {
      categories: { // mapping from slug > label
        billing: 'My Billing',
      },
    },
  },
};

function MyComponent() {
  return (
    <MagicBell locale={customLocale} apiKey={MAGICBELL_API_KEY} userEmail="john@example.com" />
      {(props) => <FloatingNotificationInbox height={450} {...props} />}
    </MagicBell>
  );
}
```
