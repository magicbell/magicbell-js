---
'@magicbell/cli': major
---

**Breaking Changes** - please read carefully.

We've separated the project from user resources. All user resources have been moved under the `user` namespace. This is a virtual path, that does not translate one-on-one to the REST api. All user resources require a `--user-email` or `--user-external-id` option to be provided.

**Project Resources**

The project resources have been left untouched, and work as before. This includes the commands as below. Note that `magicbell notifications` was a mixture of project and user scoped resources, and has been split into `magicbell notifications` and `magicbell user notifications`. On the project scope, only `magicbell notifications create` remains.

```shell
magicbell broadcasts
magicbell imports
magicbell metrics
magicbell notifications
magicbell users
```

**User Resources**

User resources include all API endpoints that do not require the api secret key, but use the api key and user email or user external id to authenticate the user. This includes the resources as below. Please note that all user scoped commands require a `--user-email` or `--user-external-id` option to be provided. If you're authenticated with `api-secret` we'll compute the `--user-hmac` for you. Otherwise, you'll have to provide it manually with the `--user-hmac` option if HMAC is enabled for your project.

```shell
magicbell user listen
magicbell user notification-preferences
magicbell user notifications
magicbell user push-subscriptions
magicbell user subscriptions
```
