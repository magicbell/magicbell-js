# @magicbell/cli

## 1.2.0

### Minor Changes

- [#143](https://github.com/magicbell-io/magicbell-js/pull/143) [`26e9e1a`](https://github.com/magicbell-io/magicbell-js/commit/26e9e1a737d946d4fc42b81a126f9b2c794cb8f4) Thanks [@smeijer](https://github.com/smeijer)! - Add `--max-items` to methods supporting `--paginate`. This way it's trivial to auto paginate over records at MagicBell, till a certain reasonable limit is reached. By default, `--paginate` iterates over every single record potentially hitting, but respecting, API rate limits.

  ```shell
  $ magicbell broadcasts list --paginate --max-items 1000
  ```

## 1.1.0

### Minor Changes

- [`963fcc1`](https://github.com/magicbell-io/magicbell-js/commit/963fcc1030f1cbcb621a19dc0b446558fedee790) Thanks [@smeijer](https://github.com/smeijer)! - feat: add user options to listen

  ```shell
  magicbell listen --user-email person@example.com
  magicbell listen --user-external-id usr_123
  ```

## 1.0.0

### Major Changes

- [#139](https://github.com/magicbell-io/magicbell-js/pull/139) [`22f7267`](https://github.com/magicbell-io/magicbell-js/commit/22f72679b65405e79a5a4a80d112678c3080ddc5) Thanks [@smeijer](https://github.com/smeijer)! - Work with MagicBell from the command line!

  ```shell
  npm i -g @magicbell/cli

  magicbell login
  magicbell --help
  ```

  Example output of `magicbell --help`:

  ```shell
  Usage
    magicbell [options] [command]

  Resource commands
    broadcasts                Manage broadcasts
    imports                   Manage imports
    listen                    Listen to events for a users inbox
    metrics                   Manage metrics
    notification-preferences  Manage notification preferences
    notifications             Send and retrieve notifications
    push-subscriptions        Manage push subscriptions
    subscriptions             Manage subscriptions
    users                     Manage all known users

  Other commands
    config                    Manage configuration for magicbell
    login                     Login to your MagicBell account
    logout                    Logout of your MagicBell account

  Options
    -v, --version             Show magicbell version
    -p, --profile <string>    Profile to use (default: "default")
    --no-color                Color output
    -h, --help                Show help for command
  ```