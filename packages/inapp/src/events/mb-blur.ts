export type MbBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'mb-blur': MbBlurEvent;
  }
}
