import '../../dist/mb-button.js';

import { createApp } from 'vue';

const App = {
  template: '<mb-button autoReset>Vue Test</mb-button>',
};

createApp(App).mount('#app');
