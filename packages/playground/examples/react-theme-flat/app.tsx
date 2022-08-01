import MagicBell, {
  flatTheme,
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react';

export default function Index() {
  return (
    <MagicBell
      apiKey="__MAGICBELL_API_KEY__"
      userEmail="__MAGICBELL_USER_EMAIL__"
      userKey="__MAGICBELL_USER_KEY__"
      theme={flatTheme}
      defaultIsOpen
    >
      {(props) => <FloatingNotificationInbox height={450} {...props} />}
    </MagicBell>
  );
}
