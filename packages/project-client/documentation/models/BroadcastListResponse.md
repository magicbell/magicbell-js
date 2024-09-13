# BroadcastListResponse

**Properties**

| Name  | Type          | Required | Description |
| :---- | :------------ | :------- | :---------- |
| links | `Links`       | ✅       |             |
| data  | `Broadcast[]` | ✅       |             |

# Links

**Properties**

| Name | Type     | Required | Description                                                                  |
| :--- | :------- | :------- | :--------------------------------------------------------------------------- |
| next | `string` | ✅       | The cursor to the next page of results. If null, there are no more results.  |
| prev | `string` | ✅       | The cursor to the previous page of results. If null, this is the first page. |
