# DTS / React / Storybook / Vite / mono-repo setup

Congrats! You just saved yourself hours of work by bootstrapping your project with this template. Let’s get you oriented with what’s here and how to use it.

> This setup is meant for developing React component libraries (not apps!) that can be published to NPM. If you’re looking to build a React-based app, you should use `create-react-app`, `razzle`, `nextjs`, `gatsby`, or `react-static`.

## Requirements

Note that this repo is a mono-repo based on yarn workspaces. It won't work with `npm`, so use `yarn` instead.

## Setup

First things first, search for occurrences of `ts-project` in this folder, and replace them with your org name. For example in these config files:

```
.changeset/config.json
example/package.json
packages/react/package.json
packages/utils/package.json
package.json
tsconfig.json
```

Run `yarn install` once you're done replacing, and test a build with `yarn build` to see if you've missed some references.

## Commands

We work with packages in `/packages`, and have a [Vite-based](https://vitejs.dev) playground inside `/example`.

The recommended workflow is to run package bundlers in one terminal:

```shell
yarn start
```

This uses [turborepo](https://www.npmjs.com/package/turbo) to build individual packages to their `/dist` folder, and runs the project in watch mode so any edits you save inside `/packages` causes a rebuild that, and all related packages.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn start:storybook
```

This loads the stories from `*.stories.tsx` files from package source folders (`packages/*/src`).

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### Example

Then run the example inside another:

```bash
yarn start:example
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure you're running the package builders in watch mode like we recommend above.

To do a one-off production build, use `yarn build`.

To run tests, use `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Vitest

Vite tests are set up to run with `yarn test`.

### Rollup

DTS uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Three actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)
- `release` which creates release pull-requests, and releases new versions

## Optimizations

Please see the main `dts` [optimizations docs](https://github.com/weiran-zsd/dts-cli#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/weiran-zsd/dts-cli#invariant) and [warning](https://github.com/weiran-zsd/dts-cli#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple [Vite](https://vitejs.dev) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
yarn build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. DTS has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

Provide the `NPM_TOKEN` to github to deploy via github actions, or run `yarn release` for manual publishing.
