import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react';
import { useEffect, useState } from 'react';

// See the tabs above for the icon, it's just an SVG.
import { BellIcon } from './icons';

const theme = {
  header: { backgroundColor: '#5225C1' },
  footer: { backgroundColor: '#5225C1' },
};

function Badge({ count: initialCount }) {
  // props.count holds the number of unseen/unread notifications as provided by MagicBell
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Simulate a new notification every second, for a more real-world manipulation
    // one might need to fetch data from an API.
    const fn = () => setCount((c) => (c === 9 ? 0 : c + 1));
    const interval = setInterval(fn, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hide counter when there are no notifications
  if (count === 0) return null;

  // Return a custom badge.
  return (
    <div
      style={{
        position: 'absolute',
        background: '#E8383A',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        top: -5,
        right: -5,
        width: 16,
        height: 16,
        padding: 2,
        borderRadius: 8,
        boxShadow: '0 0 0px 3px white',
      }}
    >
      {count}
    </div>
  );
}

export default function Index() {
  return (
    <MagicBell
      apiKey="__MAGICBELL_API_KEY__"
      userEmail="__MAGICBELL_USER_EMAIL__"
      userKey="__MAGICBELL_USER_KEY__"
      BellIcon={<BellIcon />}
      Badge={Badge}
      theme={theme}
    >
      {(props) => <FloatingNotificationInbox height={450} {...props} />}
    </MagicBell>
  );
}
