import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';

import { stripIndent } from '~/components/sandbox/utils';

const getIndexHtml = (body) =>
  stripIndent(`
  <!doctype html>
  <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>MagicBell Playground</title>
        <base href="/">
                
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
                
    <body>
      <style>
        /* note, codesandbox applies the <head>, sandpack does not */
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }
        
        body {
          padding: 20px;
        }
      </style>
      <div style="display: inline-block;">
        ${body}
      </div>
    </body>
  </html>
`);

export const TEMPLATES: Partial<
  Record<SandpackPredefinedTemplate, Record<string, string>>
> = {
  'vanilla-ts': {
    '/index.html': getIndexHtml(
      `<div id="app"></div><script src="src/index.js"></script>`,
    ),
    '/src/index.ts': stripIndent(`
      import 'twind/shim';
      import "./styles.css";
      import '../mocks';
      import '../app.ts';
    `),
  },

  'react-ts': {
    '/public/index.html': getIndexHtml(`<div id="root"></div>`),
    '/index.tsx': stripIndent(`
      import 'twind/shim';
      import './mocks';

      import React, { StrictMode } from "react";
      import ReactDOM from "react-dom";
      import "./styles.css";
      
      import App from "./App";
      
      const rootElement = document.getElementById("root");
      ReactDOM.render(
        <StrictMode>
          <App />
        </StrictMode>,
        rootElement
      );
    `),
  },

  angular: {
    '/src/index.html': getIndexHtml(`<app-root></app-root>`),
    '/src/main.ts': stripIndent(`
      import 'twind/shim';
      import '../mocks';
      
      import { enableProdMode } from '@angular/core';
      import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
            
      import { AppModule } from './app/app.module';            
      platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
    `),
  },

  vue: {
    '/public/index.html': getIndexHtml(`<div id="app"></div>`),
    '/src/main.js': stripIndent(`
      import 'twind/shim';
      import '../mocks';
      
      import Vue from "vue";
      import App from "./App.vue";
      Vue.config.productionTip = false;
      new Vue({
        render: h => h(App)
      }).$mount("#app");
    `),
  },

  vue3: {
    '/public/index.html': getIndexHtml(`<div id="app"></div>`),
    '/src/main.js': stripIndent(`
      import 'twind/shim';
      import '../mocks';
      
      import { createApp } from 'vue'
      import App from './App.vue'
              
      createApp(App).mount('#app');
    `),
  },
};
