import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '@ts-project/react';
import '@ts-project/react/dist/styles.css';

function App() {
  return (
    <div>
      <Thing />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
