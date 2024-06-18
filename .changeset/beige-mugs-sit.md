---
'@magicbell/cli': minor
---

Move `fields` to query params for `api` get requests. This makes it just slightly easier to form urls for GET request when using the `api` escape hatch in our cli.

```shell
mb api '/notifications' -f seen=false -X get -c user -r curl

curl --url 'https://api.magicbell.com/notifications?seen=false' \
  --request 'GET' \
  --header 'accept: application/json' \
  --header 'accept-version: v2' \
  --header 'x-magicbell-api-key: 8cd...c70' \
  --header 'x-magicbell-user-email: stephan@example.com' \
  --header 'x-magicbell-user-hmac: uaZ...hU='
```
