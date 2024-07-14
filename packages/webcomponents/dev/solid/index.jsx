// tests/solid/index.js
import '../../dist/mb-button.js';

import { render } from 'solid-js/web';

const App = () => (
  <div>
    <mb-button>Solid Test</mb-button>
  </div>
);

render(() => <App />, document.getElementById('root'));
