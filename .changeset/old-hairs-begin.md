---
'@magicbell/magicbell-react': minor
---

Theme, locale, and image settings can now be published from the MagicBell dashboard, and will be automatically used by the inbox. This means you can now change the look and feel of the inbox without needing to change code.

The behavior is backward compatible. Config is only applied after publishing from the dashboard, and properties provided to the MagicBell provider precede the published settings.

In other words, to enable this new behavior for a current integration, you'll need to remove the `theme`, `locale`, and/or `images` properties from the `MagicBell` component and publish the settings from the dashboard.

When all three props are provided, remote settings will not be fetched.

```tsx
<MagicBell
  apiKey="..."
  userEmail="..."
  locale={customLocale}
  theme={{
    header: {
      backgroundColor: 'lightblue',
    },
  }}
  images={{}}
>
  {(props) => <FloatingNotificationInbox height={450} {...props} isOpen />}
</MagicBell>
```
