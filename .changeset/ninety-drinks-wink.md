---
'@magicbell/cli': major
---

Work with MagicBell from the command line!

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
