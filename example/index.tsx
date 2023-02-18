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
      <MagicBell apiKey="api-key-here" userEmail="stephan@magicbell.io" userKey="..." locale={customLocale}>
        {(props) => <FloatingNotificationInbox height={450} {...props} />}
      </MagicBell>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
