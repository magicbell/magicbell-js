import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

const config = {
  serverURL: 'https://api.magicbell.cloud',
  socketURL: 'wss://ws.magicbell.cloud/staging',
  apiKey: 'pk_rid7264AZft56l353669_88230023',
  userEmail: 'stephan@example.com',
  userKey: 'aM/Z9j8bgFTYiWGZvA/RZ9huX/L9lj+/vS6OaKHvHJU=',
};

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f6f8',
      }}
    >
      <MagicBell {...config} defaultIsOpen>
        {(props) => (
          <FloatingNotificationInbox
            {...props}
            height={420}
            placement="bottom-start"
            offset={{ mainAxis: 16, crossAxis: 0 }}
            hideArrow
            isOpen
            closeOnClickOutside={false}
          />
        )}
      </MagicBell>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
