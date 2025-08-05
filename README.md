# MagicBell

This monorepo contains JavaScript/TypeScript based SDKs to build a notification inbox for your site, powered by [MagicBell](https://magicbell.com).

## Documentation

You can find the MagicBell documentation on [magicbell.com/docs](https://magicbell.com/docs). Documentation found in this README applies to the dev setup of this monorepo. It does not cover or apply to the consumption of the SDKs.

For SDK documentation see [magicbell.com/docs](https://magicbell.com/docs), or the package readmes at: [packages/core](packages/core), [packages/embeddable](packages/embeddable), [packages/magicbell-react](packages/react), [packages/react-headless](packages/react-headless).

## Requirements

The development environment for this repo supports `node:v18` and up. We use `yarn` as package manager.

You'll need TypeScript 4.5 or higher for our bundled type definitions.

## Setup

Run the following commands in your terminal to get a copy of this repo, and install required dependencies.

```
git clone git@github.com:magicbell/magicbell-js.git
cd magicbell-js
yarn
```

### Packages

When working on the packages, you'll want to run the builder in watch mode. You can do so by:

```
yarn start
```

This builds the packages, and recompiles all affected ones when you make changes in the `packages` folder.

### Storybook

We have a single storybook instance available for stories in all packages. Run it with:

```
yarn start:storybook
```

After that, visit http://localhost:6006. Storybook will hot-reload on any change that you make in `/packages`. Make sure that you're running `yarn start` in another terminal, when you have the feeling that you're dealing with stale data.

### Example

There is a vite based example application located in the /example/floating-inbox folder. This gives one the opportunity to try out use cases in a production like environment. Run it with:

```
yarn start:example
```

After that, visit http://localhost:3000. The example app will hot-reload on any change that you make in `/packages`. Make sure that you're running `yarn start` in another terminal, when you have the feeling that you're dealing with stale data.

The /example folder contains more examples like a Next.js Web Push app as well.

## Contribute

Code quality is set up for you with `eslint`, `prettier`, `husky`, and `lint-staged`. Please keep the pre-commit hooks enabled.

## Optimizations

You can take advantage of [invariant](https://npmjs.com/tiny-invariant), [warning](https://npmjs.com/tiny-warning) and `__DEV__` to add development-only warnings which won't end up in our production bundles.

```js
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

invariant(truthyValue, 'This should not throw!');
invariant(falsyValue, 'This will throw!');

warning(truthyValue, 'This should not log a warning');
warning(falsyValue, 'This should log a warning');

if (__DEV__) {
  // this is excluded from the production bundle
}
```

### Tests

Tests are setup using [vitest](https://npmjs.com/vitest). They can be run once with coverage with `yarn test` or use `yarn test:watch` to run them in watch mode.

```
yarn test:watch
```

### Pull Requests

When contributing changes, make sure to document them in a changeset. You'll usually do this when you're ready to push the changes and create a pull-request. To do so, run:

```
yarn changeset
```

`Changeset` will ask you for a change description, and how different packages are affected. Your answers help us determine if packages should be bumped in version, and if it should be a `patch`, `minor`, or `major` version bump. The description you provide may end up in our changelogs, please write it in a way that makes sense to our users.

Please review, polish, and commit the files after completing the steps.

Please use a descriptive title for pull-request. The title should be in semantic commit format, so we can use it as (squash merge) commit message and automate the release process.

Please add a description that explains the change. The changeset is likely to form a solid basis for your description, tho the pull-request description is written for our maintainers and thereby may be more technical and explain why certain decisions were made.

## Publish

Publishing new package versions is an automated process managed via the `release` workflow. To trigger a release, push a commit containing changesets (`yarn changeset`) to `main`. This will trigger the bot to open or update a pull-request named `next release`. Once that pull request gets merged, the bot will publish the new versions to npm and create the release notes on GitHub.

### Manual publishing

Manual publishing is done in two steps:

```
yarn changeset:version
```

This command consumes the changesets as collected in [.changeset](.changeset), and proposes changelogs and version bumps. Please review the proposed changes, and polish the changelogs. Make sure that breaking changes result in major version bumps.

Commit the change with `git add . && git commit -m 'version packages'`, and move on to the next step to publish.

```
yarn changeset:release
```

This will publish all changed packages to npm, and tag the last commit. Please don't commit anything between the release commit, and the publish action. These command are separate to enable you to check if the release commit is accurate.
