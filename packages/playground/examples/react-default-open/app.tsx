import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react';

export default function Index() {
  return (
    <MagicBell
      apiKey="__MAGICBELL_API_KEY__"
      userEmail="__MAGICBELL_USER_EMAIL__"
      userKey="__MAGICBELL_USER_KEY__"
      defaultIsOpen
    >
      {(props) => <FloatingNotificationInbox height={450} {...props} />}
    </MagicBell>
  );
}
