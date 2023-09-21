import 'react-app-polyfill/ie11';

import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const customLocale = {
  name: 'en',
  translations: {
    preferences: {
      categories: {
        billing: 'My Billing',
      },
    },
  },
};

function App() {
  return (
    <div id="target">
      <MagicBell
        serverURL="https://api.magicbell.dev"
        apiKey="024b10085bb148d918afe3d92f42b1eba16ad0bd"
        userEmail="stephan@magicbell.io"
        locale={customLocale}
        defaultIsOpen={true}
      >
        {(props) => <FloatingNotificationInbox height={450} {...props} isOpen />}
      </MagicBell>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
