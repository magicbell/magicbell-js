import 'react-app-polyfill/ie11';

import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function App() {
  return (
    <div id="target">
      <MagicBell apiKey="api-key-here" userEmail="stephan@magicbell.io" userKey="...">
        {(props) => <FloatingNotificationInbox height={450} {...props} />}
      </MagicBell>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
