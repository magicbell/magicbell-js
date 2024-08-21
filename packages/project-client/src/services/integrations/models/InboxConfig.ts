export interface InboxConfig {
  images: Images;
  locale: string;
  theme: Theme;
}
interface Images {
  [k: string]: unknown;
}
interface Theme {
  [k: string]: unknown;
}
