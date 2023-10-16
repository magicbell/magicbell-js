---
'@magicbell/magicbell-react': patch
---

Add `isOpen` prop to `MagicBell` provider, together with the existing `onToggle` prop, this allows for controlled open/closed states.

```tsx
function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((open) => !open);

  return (
    <>
      <button type="button" onClick={open}>
        open
      </button>
      <button type="button" onClick={close}>
        close
      </button>
      <button type="button" onClick={toggle}>
        toggle
      </button>

      <MagicBell apiKey="__API_KEY__" userEmail="__USER_EMAIL__" onToggle={toggle} isOpen={isOpen}>
        {(props) => <FloatingNotificationInbox height={450} {...props} />}
      </MagicBell>
    </>
  );
}
```
