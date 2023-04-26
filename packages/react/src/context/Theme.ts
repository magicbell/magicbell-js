import { lightTheme } from '../themes/light';

export interface IElementTheme {
  backgroundColor: string;
  backgroundOpacity: number;
  borderRadius: string;
  borderColor?: string;
  fontFamily: string;
  fontSize: string;
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  textColor: string;
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
  padding?: string;
  fontWeight: string | number;
}

interface NotificationTheme extends IElementTheme {
  margin: string;
  hover: {
    backgroundColor: string;
    backgroundOpacity: number;
  };
  title: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string | number;
    textColor: string;
  };
  state: {
    color: string;
  };
}

interface ProseTheme {
  headings: string;
  links: string;
  bold: string;
  hr: string;
  quotes: string;
  quoteBorders: string;
  captions: string;
  code: string;
  preCode: string;
  preBg: string;
  thBorders: string;
  tdBorders: string;
  buttonBorders: string;
  buttons: string;
  fontMono: string;
}

interface TabsTheme {
  margin: string;
  spacing: string;
  fontSize: string;
  fontWeight: number;
  color: string;
  activeColor: string;
}

export interface IMagicBellTheme {
  prose: ProseTheme;
  icon: {
    borderColor: string;
    width: string;
  };
  unseenBadge: IElementTheme;
  tabs: TabsTheme;
  header: IElementTheme;
  container: IElementTheme & { boxShadow?: string };
  footer: IElementTheme;
  banner: {
    backgroundColor: string;
    backgroundOpacity: number;
    textColor: string;
    boxShadow: string;
    fontFamily: string;
    fontSize: string;
    textAlign: string;
  };
  notification: {
    default: NotificationTheme;
    unread: NotificationTheme;
    unseen: NotificationTheme;
  };
  dialog: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
}

export const defaultTheme: IMagicBellTheme = lightTheme;
