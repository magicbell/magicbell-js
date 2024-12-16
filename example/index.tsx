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
    <div
      id="target"
      style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        marginLeft: -25,
        marginTop: -25,
        width: 50,
        height: 50,
        background: 'white',
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MagicBell
        serverURL="https://api.magicbell.dev"
        apiKey="024b10085bb148d918afe3d92f42b1eba16ad0bd"
        userEmail="stephan@example.com"
        locale={customLocale}
        defaultIsOpen={true}
        stores={[
          { id: 'default', defaultQueryParams: {} },
          { id: 'topic', defaultQueryParams: { topic: 'issue-1' } },
          { id: 'category', defaultQueryParams: { category: 'billing' } },
          { id: 'both', defaultQueryParams: { category: 'billing', topic: 'issue-1' } },
        ]}
      >
        {(props) => (
          <FloatingNotificationInbox
            tabs={[
              { storeId: 'default', label: 'default' },
              { storeId: 'topic', label: 'topic issue-1' },
              { storeId: 'category', label: 'category billing' },
              { storeId: 'both', label: 'topic and category' },
            ]}
            height={450}
            {...props}
            placement="bottom-start"
            offset={{ mainAxis: 24, crossAxis: -16 }}
            arrowPadding={16}
            hideArrow
            isOpen
          />
        )}
      </MagicBell>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
