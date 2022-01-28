import 'twind/shim';

import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react';

export default function Index() {
  return (
    <nav className="flex justify-between bg-white p-4 m-4 rounded shadow-lg">
      <ul className="flex space-x-8">
        <li>home</li>
        <li>about</li>
      </ul>

      <MagicBell
        apiKey="9b110461aa11a33b41cceb346dcfe030af14f39d"
        userEmail="stephan.meijer@gmail.com"
        userKey="71qj/ah4otyHvDJnRVAFMvD71SuRjGtogzOcWOVUblM="
        theme={{ icon: { borderColor: '#000' } }}
      >
        {(props) => <FloatingNotificationInbox height={300} {...props} />}
      </MagicBell>
    </nav>
  );
}
