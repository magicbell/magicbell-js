export type MbFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'mb-focus': MbFocusEvent;
  }
}
