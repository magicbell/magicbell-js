import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import * as glob from 'glob';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const browsers = {
  chromium: playwrightLauncher({ product: 'chromium' }),
  firefox: playwrightLauncher({ product: 'firefox' }),
  webkit: playwrightLauncher({ product: 'webkit' }),
};

// Prepend BROWSERS=x,y to `npm run test` to run a subset of browsers
// e.g. `BROWSERS=chromium,firefox npm run test`
const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};

let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map((b) => browsers[b] ?? noBrowser(b));
} catch (e) {
  console.warn(e);
}

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: '.',
  files: ['./src/**/*.test.ts'],
  nodeResolve: { exportConditions: mode === 'dev' ? ['development'] : [] },
  preserveSymlinks: true,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  browserStartTimeout: 120_000,
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '60000',
    },
  },
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <link rel="stylesheet" href="dist/css/core.css">
        <link rel="stylesheet" href="dist/css/theme.css">
        <script>
          window.process = { env: { NODE_ENV: "production" } }
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020',
    }),
  ],
  // Create a named group for every test file to enable running single tests. If a test file is `mb-button.test.ts`
  // then you can run `npm run test -- --group mb-button` to run only that component's tests.
  groups: glob.sync('src/**/*.test.ts').map((path) => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;

    return {
      name: groupName,
      files: path,
    };
  }),
};
