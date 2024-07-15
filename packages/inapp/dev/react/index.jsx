import '../../dist/mb-button.js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MbButton from '../../dist/react/mb-button.js';

const App = () => (
  <div>
    <div id="scope">
      <style>
        {`
        #scope mb-button::part(button) {
          background-color: silver;
        }
      `}
      </style>
      <mb-button variant="primary">React Test</mb-button>
    </div>

    <MbButton variant="primary">React Component</MbButton>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
