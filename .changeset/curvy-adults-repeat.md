---
'@magicbell/magicbell-react': patch
---

fix: wait for `markAsRead` before opening notification `action_url`.

This fixes a race-condition where the page reload and fetching new notifications is faster than marking the notification as read, which would result in showing the notification as 'unread' upon page (re)load.
