---
'magicbell': minor
'@magicbell/cli': minor
'@magicbell/embeddable': minor
'@magicbell/magicbell-react': minor
'@magicbell/react-headless': minor
---

We're moving from server-sent-events to websockets for realtime events. If you've been using the [EventSource](https://www.npmjs.com/package/eventsource) polyfill for MagicBell SDKs, you can now remove it.
