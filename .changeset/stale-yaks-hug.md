---
'@magicbell/magicbell-react': minor
---

feat: support css variables as theme color value

```tsx
import MagicBell, { NotificationInbox } from '@magicbell/magicbell-react';

const customTheme = {
  icon: {
    borderColor: 'var(--magicbell-icon-border-color)',
  },
};

<MagicBell theme={customTheme} apiKey={...} userEmail={...}>
    {() => <NotificationInbox height={500} />}
</MagicBell>
```
