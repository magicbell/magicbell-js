import 'twind/shim';

import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react';

export default function Index() {
  return (
    <nav className="flex justify-between bg-white p-4 m-4 rounded shadow-lg fixed left-0 right-0 top-0">
      <ul className="flex space-x-8">
        <li>home</li>
        <li>about</li>
      </ul>

      <MagicBell
        apiKey="__MAGICBELL_API_KEY__"
        userEmail="__MAGICBELL_USER_EMAIL__"
        userKey="__MAGICBELL_USER_KEY__"
        theme={{ icon: { borderColor: '#000' } }}
      >
        {(props) => <FloatingNotificationInbox height={450} {...props} />}
      </MagicBell>
    </nav>
  );
}
