# TwilioConfig

**Properties**

| Name       | Type                 | Required | Description                                     |
| :--------- | :------------------- | :------- | :---------------------------------------------- |
| accountSid | `string`             | ✅       | The SID for your Twilio account                 |
| apiKey     | `string`             | ✅       | The API key for Twilio                          |
| apiSecret  | `string`             | ✅       | The API Secret for Twilio                       |
| from       | `string`             | ✅       | The phone number to send from, in E.164 format  |
| region     | `TwilioConfigRegion` | ❌       | The region to use for Twilio, defaults to 'us1' |

# TwilioConfigRegion

The region to use for Twilio, defaults to 'us1'

**Properties**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| US1  | `string` | ✅       | "us1"       |
| IE1  | `string` | ✅       | "ie1"       |
| AU1  | `string` | ✅       | "au1"       |
