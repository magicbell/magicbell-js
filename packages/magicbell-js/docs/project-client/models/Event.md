# Event

**Properties**

| Name      | Type   | Required | Description                                     |
| :-------- | :----- | :------- | :---------------------------------------------- |
| id        | string | ✅       | The unique identifier for the event.            |
| timestamp | string | ✅       | The time at which the event was recorded.       |
| type      | string | ✅       | The type of event that occurred.                |
| code      | number | ❌       | The numeric code that categorizes the event.    |
| context   | any    | ❌       | Additional contextual attributes for the event. |
| level     | string | ❌       | The severity level assigned to the event.       |
| log       | string | ❌       | A human-readable log message.                   |
| payload   | any    | ❌       | The raw payload delivered by the event source.  |
