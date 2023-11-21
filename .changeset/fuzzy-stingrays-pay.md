---
'@magicbell/cli': minor
---

Add `magicbell api` method to make an authenticated HTTP request to the MagicBell API and print the response. This will be useful for debugging purposes or advanced users, though other existing commands are recommended for day-to-day use.

**Examples**

```shell
magicbell api broadcasts --data @broadcast.json
magicbell api broadcasts --data '{ broadcast: { title: "Hello World" } }' -i
magicbell api broadcasts -f 'broadcast={ title: "Hello World" }' -s
```

**All options:**

```shell
Arguments
  endpoint                      The API path to request

Options
  -H, --header <string...>      Add a HTTP request header in key:value format
  -X, --method <string>         The HTTP method for the request (default "POST" when data is provided, "GET"
                                otherwise)
  -d, --data <string>           HTTP POST data (can also come from stdin)
  -f, --field <string...>       Add a field parameter in key=value format
  -i, --include                 Include HTTP response status line and headers in the output
  -s, --silent                  Do not print the response body
```
