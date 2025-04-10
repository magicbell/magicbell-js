# InboxConfigPayload

**Properties**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| images | Images | ✅       |             |
| locale | string | ✅       |             |
| theme  | Theme  | ✅       |             |

# Images

**Properties**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| emptyInboxUrl | string | ✅       |             |

# Theme

**Properties**

| Name         | Type              | Required | Description |
| :----------- | :---------------- | :------- | :---------- |
| banner       | Banner            | ❌       |             |
| dialog       | Dialog            | ❌       |             |
| footer       | Footer            | ❌       |             |
| header       | Header            | ❌       |             |
| icon         | Icon              | ❌       |             |
| notification | ThemeNotification | ❌       |             |
| unseenBadge  | UnseenBadge       | ❌       |             |

# Banner

**Properties**

| Name              | Type   | Required | Description |
| :---------------- | :----- | :------- | :---------- |
| backgroundColor   | string | ✅       |             |
| fontSize          | string | ✅       |             |
| textColor         | string | ✅       |             |
| backgroundOpacity | number | ❌       |             |

# Dialog

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| accentColor     | string | ✅       |             |
| backgroundColor | string | ✅       |             |
| textColor       | string | ✅       |             |

# Footer

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |
| borderRadius    | string | ✅       |             |
| fontSize        | string | ✅       |             |
| textColor       | string | ✅       |             |

# Header

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |
| borderRadius    | string | ✅       |             |
| fontFamily      | string | ✅       |             |
| fontSize        | string | ✅       |             |
| textColor       | string | ✅       |             |

# Icon

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| borderColor | string | ✅       |             |
| width       | string | ✅       |             |

# ThemeNotification

**Properties**

| Name    | Type      | Required | Description |
| :------ | :-------- | :------- | :---------- |
| default | Default\_ | ✅       |             |
| unread  | Unread    | ✅       |             |
| unseen  | Unseen    | ✅       |             |

# Default\_

**Properties**

| Name            | Type         | Required | Description |
| :-------------- | :----------- | :------- | :---------- |
| backgroundColor | string       | ✅       |             |
| borderRadius    | string       | ✅       |             |
| fontFamily      | string       | ✅       |             |
| fontSize        | string       | ✅       |             |
| margin          | string       | ✅       |             |
| textColor       | string       | ✅       |             |
| hover           | DefaultHover | ❌       |             |
| state           | DefaultState | ❌       |             |

# DefaultHover

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |

# DefaultState

**Properties**

| Name  | Type   | Required | Description |
| :---- | :----- | :------- | :---------- |
| color | string | ✅       |             |

# Unread

**Properties**

| Name            | Type        | Required | Description |
| :-------------- | :---------- | :------- | :---------- |
| backgroundColor | string      | ✅       |             |
| textColor       | string      | ✅       |             |
| hover           | UnreadHover | ❌       |             |
| state           | UnreadState | ❌       |             |

# UnreadHover

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |

# UnreadState

**Properties**

| Name  | Type   | Required | Description |
| :---- | :----- | :------- | :---------- |
| color | string | ✅       |             |

# Unseen

**Properties**

| Name            | Type        | Required | Description |
| :-------------- | :---------- | :------- | :---------- |
| backgroundColor | string      | ✅       |             |
| textColor       | string      | ✅       |             |
| hover           | UnseenHover | ❌       |             |
| state           | UnseenState | ❌       |             |

# UnseenHover

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |

# UnseenState

**Properties**

| Name  | Type   | Required | Description |
| :---- | :----- | :------- | :---------- |
| color | string | ✅       |             |

# UnseenBadge

**Properties**

| Name            | Type   | Required | Description |
| :-------------- | :----- | :------- | :---------- |
| backgroundColor | string | ✅       |             |
