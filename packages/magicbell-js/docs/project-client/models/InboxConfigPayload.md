# InboxConfigPayload

**Properties**

| Name   | Type   | Required | Description                                                       |
| :----- | :----- | :------- | :---------------------------------------------------------------- |
| images | Images | ✅       | Image overrides for assets used in the inbox UI.                  |
| locale | string | ✅       | Locale code (ISO language tag) used to localize built-in strings. |
| theme  | Theme  | ✅       | Visual customization options for the hosted inbox widget.         |

# Images

Image overrides for assets used in the inbox UI.

**Properties**

| Name          | Type   | Required | Description                                             |
| :------------ | :----- | :------- | :------------------------------------------------------ |
| emptyInboxUrl | string | ✅       | URL for the illustration shown when the inbox is empty. |

# Theme

Visual customization options for the hosted inbox widget.

**Properties**

| Name         | Type         | Required | Description                                    |
| :----------- | :----------- | :------- | :--------------------------------------------- |
| banner       | Banner       | ❌       | Top banner styling options.                    |
| dialog       | Dialog       | ❌       | Styling for confirmation and action dialogs.   |
| footer       | Footer       | ❌       | Footer styling for the inbox modal.            |
| header       | Header       | ❌       | Header styling for the inbox modal.            |
| icon         | Icon         | ❌       | Launcher icon styling overrides.               |
| notification | Notification | ❌       | Styling overrides for notification list items. |
| unseenBadge  | UnseenBadge  | ❌       | Badge styling for unseen notification counts.  |

# Banner

Top banner styling options.

**Properties**

| Name              | Type   | Required | Description                               |
| :---------------- | :----- | :------- | :---------------------------------------- |
| backgroundColor   | string | ✅       | Banner background color.                  |
| fontSize          | string | ✅       | Font size for banner text.                |
| textColor         | string | ✅       | Banner text color.                        |
| backgroundOpacity | number | ❌       | Opacity applied to the banner background. |

# Dialog

Styling for confirmation and action dialogs.

**Properties**

| Name            | Type   | Required | Description                                     |
| :-------------- | :----- | :------- | :---------------------------------------------- |
| accentColor     | string | ✅       | Accent color for dialog buttons and highlights. |
| backgroundColor | string | ✅       | Dialog background color.                        |
| textColor       | string | ✅       | Dialog text color.                              |

# Footer

Footer styling for the inbox modal.

**Properties**

| Name            | Type   | Required | Description                                    |
| :-------------- | :----- | :------- | :--------------------------------------------- |
| backgroundColor | string | ✅       | Footer background color.                       |
| borderRadius    | string | ✅       | Border radius applied to the footer container. |
| fontSize        | string | ✅       | Font size used in the footer.                  |
| textColor       | string | ✅       | Footer text color.                             |

# Header

Header styling for the inbox modal.

**Properties**

| Name            | Type   | Required | Description                                    |
| :-------------- | :----- | :------- | :--------------------------------------------- |
| backgroundColor | string | ✅       | Header background color.                       |
| borderRadius    | string | ✅       | Border radius applied to the header container. |
| fontFamily      | string | ✅       | CSS font family for the header title.          |
| fontSize        | string | ✅       | Font size used in the header.                  |
| textColor       | string | ✅       | Header text color.                             |

# Icon

Launcher icon styling overrides.

**Properties**

| Name        | Type   | Required | Description                                  |
| :---------- | :----- | :------- | :------------------------------------------- |
| borderColor | string | ✅       | CSS color used for the icon border.          |
| width       | string | ✅       | Width of the launcher icon (any CSS length). |

# Notification

Styling overrides for notification list items.

**Properties**

| Name    | Type      | Required | Description                                     |
| :------ | :-------- | :------- | :---------------------------------------------- |
| default | Default\_ | ✅       | Base styles applied to every notification item. |
| unread  | Unread    | ✅       | Overrides for unread notifications.             |
| unseen  | Unseen    | ✅       | Overrides for unseen notifications.             |

# Default\_

Base styles applied to every notification item.

**Properties**

| Name            | Type         | Required | Description                                                |
| :-------------- | :----------- | :------- | :--------------------------------------------------------- |
| backgroundColor | string       | ✅       | Background color for notifications in their default state. |
| borderRadius    | string       | ✅       | Border radius applied to each notification card.           |
| fontFamily      | string       | ✅       | Font family for notification text.                         |
| fontSize        | string       | ✅       | Font size for notification text.                           |
| margin          | string       | ✅       | CSS margin applied around each notification card.          |
| textColor       | string       | ✅       | Default text color for notifications.                      |
| hover           | DefaultHover | ❌       | Styles applied when a notification is hovered.             |
| state           | DefaultState | ❌       | Accent colors for notification state indicators.           |

# DefaultHover

Styles applied when a notification is hovered.

**Properties**

| Name            | Type   | Required | Description                |
| :-------------- | :----- | :------- | :------------------------- |
| backgroundColor | string | ✅       | Background color on hover. |

# DefaultState

Accent colors for notification state indicators.

**Properties**

| Name  | Type   | Required | Description                         |
| :---- | :----- | :------- | :---------------------------------- |
| color | string | ✅       | Color used for the state indicator. |

# Unread

Overrides for unread notifications.

**Properties**

| Name            | Type        | Required | Description                                       |
| :-------------- | :---------- | :------- | :------------------------------------------------ |
| backgroundColor | string      | ✅       | Background color applied to unread notifications. |
| textColor       | string      | ✅       | Text color used when a notification is unread.    |
| hover           | UnreadHover | ❌       | Hover styles for unread notifications.            |
| state           | UnreadState | ❌       | State indicator styling for unread notifications. |

# UnreadHover

Hover styles for unread notifications.

**Properties**

| Name            | Type   | Required | Description                                         |
| :-------------- | :----- | :------- | :-------------------------------------------------- |
| backgroundColor | string | ✅       | Background color on hover for unread notifications. |

# UnreadState

State indicator styling for unread notifications.

**Properties**

| Name  | Type   | Required | Description                           |
| :---- | :----- | :------- | :------------------------------------ |
| color | string | ✅       | Color for the unread state indicator. |

# Unseen

Overrides for unseen notifications.

**Properties**

| Name            | Type        | Required | Description                                       |
| :-------------- | :---------- | :------- | :------------------------------------------------ |
| backgroundColor | string      | ✅       | Background color applied to unseen notifications. |
| textColor       | string      | ✅       | Text color used when a notification is unseen.    |
| hover           | UnseenHover | ❌       | Hover styles for unseen notifications.            |
| state           | UnseenState | ❌       | State indicator styling for unseen notifications. |

# UnseenHover

Hover styles for unseen notifications.

**Properties**

| Name            | Type   | Required | Description                                         |
| :-------------- | :----- | :------- | :-------------------------------------------------- |
| backgroundColor | string | ✅       | Background color on hover for unseen notifications. |

# UnseenState

State indicator styling for unseen notifications.

**Properties**

| Name  | Type   | Required | Description                           |
| :---- | :----- | :------- | :------------------------------------ |
| color | string | ✅       | Color for the unseen state indicator. |

# UnseenBadge

Badge styling for unseen notification counts.

**Properties**

| Name            | Type   | Required | Description             |
| :-------------- | :----- | :------- | :---------------------- |
| backgroundColor | string | ✅       | Badge background color. |
