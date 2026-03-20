/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const ReactDOM = require('react-dom/client');
const MagicBellModule = require('@magicbell/magicbell-react');

const MagicBell = MagicBellModule.default || MagicBellModule;
const { FloatingNotificationInbox } = MagicBellModule;

const config = {
  serverURL: 'https://api.magicbell.cloud',
  socketURL: 'wss://ws.magicbell.cloud/staging',
  apiKey: 'pk_rid7264AZft56l353669_88230023',
  userEmail: 'stephan@example.com',
  userKey: 'aM/Z9j8bgFTYiWGZvA/RZ9huX/L9lj+/vS6OaKHvHJU=',
};

function App() {
  return React.createElement(
    'div',
    {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f6f8',
      },
    },
    React.createElement(MagicBell, { ...config, defaultIsOpen: true }, (props) =>
      React.createElement(FloatingNotificationInbox, {
        ...props,
        height: 420,
        placement: 'bottom-start',
        offset: { mainAxis: 16, crossAxis: 0 },
        hideArrow: true,
        isOpen: true,
        closeOnClickOutside: false,
      }),
    ),
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
