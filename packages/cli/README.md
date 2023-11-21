# MagicBell CLI

This package provides a convenient interface to query the [MagicBell](https://magicbell.com) API.

## Requirements

Node 18 or higher.

## Installation

Install the package with npm:

```sh
npm install -g @magicbell/cli
```

or yarn:

```sh
yarn global add @magicbell/cli
```

or brew:

```shell
brew tap magicbell-io/magicbell
brew install magicbell-cli
```

## Usage

The cli needs to be configured with your project's api key and api secret key, which are available in the [MagicBell Dashboard][dashboard]. Please run `magicbell login` to set up your credentials.

```shell
magicbell login
```

## Profiles

The cli supports multiple active profiles. You can switch between profiles with the `--profile` option. Profiles are created during login. For example, to create a `staging` profile:

```shell
magicbell login --profile staging
```

All commands are executed against the `default` profile by default. To run commands against a different profile, you can use the `--profile` option or set the `MAGICBELL_PROFILE` environment variable.

```shell
magicbell users list --profile staging

# or
export MAGICBELL_PROFILE=staging
magicbell users list
```

To see what profile is currently the default, run `magicbell --help`. You'll see the current profile in the output behind the `--profile` option:

```shell
magicbell --help

# ...
#   -p, --profile <string>        Profile to use (default: "staging")
```

To see what project your current profile is associated with, run

```shell
magicbell config list
```

## Logout

To logout from your current active profile, run:

```shell
magicbell logout
```

Logout from all profiles with the `--all` option:

```shell
magicbell logout --all
```

Or a specific profile with `--profile`:

```shell
magicbell logout --profile staging
```

## Commands

Below you'll find the all supported commands with their arguments. Note that you can also run `magicbell --help` at any time to get a list of options in your console.

All user scoped commands have been placed under the `user` namespace. For example, the `/notifications` endpoint becomes `magicbell user notifications`. This to make a clear separation between project and user scoped commands. None of the commands under `user` depend on the api secret key, but they do need a user-email and/or user-external-id. When the api secret is available, the user hmac is calculated automatically.

## Project scoped commands

All project scoped commands require an active session authenticated by the api secret. Please run `magicbell login` prior to running any of these commands.

<!-- AUTO-GENERATED-CONTENT:START (PROJECT_RESOURCE_METHODS) -->

### Broadcasts

#### Create broadcasts

Create a broadcast to send notifications to upto a 1,000 recipients - users or topic subscribers. You can identify users by their email address or by an external_id.

You don't have to import your users into MagicBell. If a user does not exist we'll create it automatically.

You can send user attributes like first_name, custom_attributes, and more when creating a broadcast.

A new notification will be shown in the inbox of each recipient in real-time. It will also be delivered to each recipient through all channels you have enabled for your project.

```shell
magicbell broadcasts create  \
  --title 'We\'re processing your order'  \
  --content '<p>Thank you for your order. We\'ll notify you when these items are ready.</p>'  \
  --category 'order_created'  \
  --topic 'order:33098'  \
  --recipients 'dan@example.com'  \
  --overrides '{"channels":{"email":{"title":"[MagicBell] We\'re processing your order","content":"Thank you for your order. If you need help, or have any questions please don\'t hesitate to reach out to us directly at hello@magicbell.com"}}}'
```

#### List broadcasts

List all broadcasts. Broadcasts are sorted in descending order by the sent_at timestamp.

```shell
magicbell broadcasts list
```

#### Fetch a broadcast by its ID

Fetch a broadcast by its ID.

```shell
magicbell broadcasts get <broadcast-id>
```

### Broadcasts Notifications

#### Fetch notifications by broadcast id.

Fetch the notifications for a broadcast.

```shell
magicbell broadcasts notifications list <broadcast-id>
```

### Users

#### Create a user

Create a user. Please note that you must provide the user's email or the external id so MagicBell can uniquely identify the user.

The external id, if provided, must be unique to the user.

```shell
magicbell users create  \
  --external-id '56780'  \
  --email 'hana@supportbee.com'  \
  --first-name 'Hana'  \
  --last-name 'Mohan'  \
  --custom-attributes '{"plan":"enterprise","pricing_version":"v10","preferred_pronoun":"She"}'  \
  --phone-numbers '+15005550001'
```

#### Fetch users

Fetches users for the project identified by the auth keys. Supports filtering, ordering, and pagination.

```shell
magicbell users list
```

#### Get user by ID

Fetch a user by id, for the project identified by the auth keys.

```shell
magicbell users get <user-id>
```

#### Update a user

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```shell
magicbell users update <user-id>  \
  --email 'hana@magicbell.io'
```

#### Update a user identified by email

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```shell
magicbell users update-by-email <user-email>  \
  --external-id '56780'  \
  --email 'hana@supportbee.com'  \
  --first-name 'Hana'  \
  --last-name 'Mohan'  \
  --custom-attributes '{"plan":"enterprise","pricing_version":"v10","preferred_pronoun":"She"}'  \
  --phone-numbers '+15005550001'
```

#### Update a user identified by external ID

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```shell
magicbell users update-by-external-id <external-id>  \
  --external-id '56780'  \
  --email 'hana@supportbee.com'  \
  --first-name 'Hana'  \
  --last-name 'Mohan'  \
  --custom-attributes '{"plan":"enterprise","pricing_version":"v10","preferred_pronoun":"She"}'  \
  --phone-numbers '+15005550001'
```

#### Delete a user

Immediately deletes a user.

```shell
magicbell users delete <user-id>
```

#### Delete a user identified by email

Immediately deletes a user.

```shell
magicbell users delete-by-email <user-email>
```

#### Delete a user identified by external ID

Immediately deletes a user.

```shell
magicbell users delete-by-external-id <external-id>
```

### Users Notifications

#### Fetch notifications by user id.

Fetch the notifications and deliveries for a user.

```shell
magicbell users notifications list <user-id>
```

### Users Push Subscriptions

#### Fetch user's push subscriptions

Fetch a user's push subscriptions. Returns a paginated list of web and mobile push subscriptions for all platforms.

```shell
magicbell users push-subscriptions list <user-id>
```

#### Delete user's push subscription

Delete a user's push subscriptions. Identifies the user by the user's ID and the push subscription by the subscription's ID.

```shell
magicbell users push-subscriptions delete <user-id> <subscription-id>
```

### Imports

#### Create a import

Enqueues an import - currently only supported for users. Amongst other things, the users import allows associating slack channels (if you have already setup the oauth apps).

```shell
magicbell imports create  \
  --users '{"external_id":"ugiabqertz","email":"johndoe@example.com","first_name":"John","last_name":"Doe","custom_attributes":{"age":32,"country":"Spain"},"channels":{"slack":{"providers":[{"oauth":{"channel_id":"U039446XF3Y","app":{"app_id":"your_slack_app_id","team_id":"workspace_id_from_slack"}}}]}}}'
```

#### Get the status of an import

Query the status of the import for a summary of imported records and failures for each record that could not be imported successfully.

```shell
magicbell imports get <import-id>
```

### Metrics

#### Get notification metrics

Query the metrics of broadcasts and their recipients.

```shell
magicbell metrics get
```

### Metrics Categories

#### Get notification metrics grouped by category

Query the metrics of broadcasts and their recipients, grouped by category.

```shell
magicbell metrics categories get
```

### Metrics Topics

#### Get notification metrics grouped by topic

Query the metrics of broadcasts and their recipients, grouped by topic.

```shell
magicbell metrics topics get
```

<!-- AUTO-GENERATED-CONTENT:END (PROJECT_RESOURCE_METHODS) -->

## User scoped commands

User scoped commands require a user email or external id to be provided. The api secret is not required, but the api key is. When the api secret key is available, the user hmac is calculated automatically. Otherwise, the hmac needs to be provided as an option. See `magicbell user --help` for more information.

<!-- AUTO-GENERATED-CONTENT:START (USER_RESOURCE_METHODS) -->

### User Notifications

#### Archive a notification

Mark a user notification as archived.

```shell
magicbell user notifications archive <notification-id>
```

#### Mark all notifications as read

Mark all notifications of a user as read. When you call this endpoint, the notification inboxes of this user will be updated in real-time.

```shell
magicbell user notifications mark-all-read
```

#### Mark all notifications as seen

Mark all notifications of a user as seen. When you call this endpoint, the notification inboxes of this user will be updated in real-time.

```shell
magicbell user notifications mark-all-seen
```

#### Mark a notification as read

Mark a user notification as read. The notification will be automatically marked as seen, too.

The new state will be reflected in the user's notification inbox in real-time.

```shell
magicbell user notifications mark-as-read <notification-id>
```

#### Mark a notification as unread

Mark a user notification as unread. The new state will be reflected in the user's notification inbox in real-time.

```shell
magicbell user notifications mark-as-unread <notification-id>
```

#### Fetch notifications for a user

Fetch a user's notifications. Notifications are sorted in descending order by the sent_at timestamp.

```shell
magicbell user notifications list
```

#### Fetch notification by ID

Fetch a user's notification by its ID.

```shell
magicbell user notifications get <notification-id>
```

#### Delete a notification

Delete a user's notification by its ID. The notification is deleted immediately and removed from the user's notification inbox in real-time.

```shell
magicbell user notifications delete <notification-id>
```

#### Unarchive a notification

Mark a user notification as unarchived.

```shell
magicbell user notifications unarchive <notification-id>
```

### User Push Subscriptions

#### Register a device token for a user

Register a device token for push notifications.

Please keep in mind that mobile push notifications will be delivered to this device only if the channel is configured and enabled.

```shell
magicbell user push-subscriptions create  \
  --device-token 'x4doKe98yEZ21Kum2Qq39M3b8jkhonuIupobyFnL0wJMSWAZ8zoTp2dyHgV'  \
  --platform 'ios'
```

#### List user's device tokens

Returns the list of device tokens registered for push notifications.

```shell
magicbell user push-subscriptions list
```

#### Delete user's device token

Deletes the registered device token to remove the mobile push subscription.

```shell
magicbell user push-subscriptions delete <device-token>
```

### User Notification Preferences

#### Fetch user notification preferences

Fetch a user's notification preferences. If a user does not disable a channel explicitly, we would send notifications through that channel as long as your project is enabled.

```shell
magicbell user notification-preferences get
```

#### Update user notification preferences

Update a user's notification preferences. These preferences will be applied only to channels you enabled for your project.

```shell
magicbell user notification-preferences update  \
  --categories '{"slug":"billing","channels":[{"slug":"email","enabled":false},{"slug":"web_push","enabled":false}]}'
```

### User Subscriptions

#### Create a topic subscription

Set a user's subscription status to subscribed for a particular topic (and optional categories). If the user previously unsubscribed, the user will be resubscribed.

```shell
magicbell user subscriptions create  \
  --categories '{"slug":"comments","reason":"watching-the-repo"}'  \
  --topic 'acme-inc.orders.1234'
```

#### Unsubscribe from a topic

Unusbscribe a user from a particular topic (and optional categories).

```shell
magicbell user subscriptions unsubscribe <topic>  \
  --categories '{"slug":"comments"}'
```

#### Fetch user's topic subscriptions

Fetch a user's topic subscriptions.

```shell
magicbell user subscriptions list
```

#### Show a topic subscription

Show a user's subscription status for a particular topic and categories.

```shell
magicbell user subscriptions get <topic>
```

#### Delete topic subscription(s)

```shell
magicbell user subscriptions delete <topic>  \
  --categories '{"slug":"comments"}'
```

<!-- AUTO-GENERATED-CONTENT:END (USER_RESOURCE_METHODS) -->

### Raw API requests

You can make raw API requests with the `api` command. This command makes an authenticated HTTP request to the MagicBell API and prints the response. Note that this client is authenticated using the project credentials, not the user credentials. You can use the `--profile` option to make requests against a different profile. This command is useful for debugging purposes, but we recommend using the other commands for day-to-day use.

```shell
magicbell api --help
```

## Support

New features and bug fixes are released on the latest major version of the `@magicbell/cli` package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.

[dashboard]: https://app.magicbell.com
