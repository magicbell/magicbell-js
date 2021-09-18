import { useTheme } from '../../context/MagicBellThemeContext';

/**
 * Hook to get the right border radius for the notification inbox.
 *
 * E.g.: If the header is the first element, its defined border radius will be
 * applied to the container top corners. If it is the last element, its border
 * radius will be applied to the bottom corners of the container.
 *
 * @param layout Layout used to sort components in the notification inbox
 * @returns An array containing the rules for the border radius sorted (CSS order).
 */
export default function useContainerBorderRadius(layout: string[]) {
  const theme = useTheme();
  const { container: containerTheme, header: headerTheme, footer: footerTheme } = theme;

  let firstComponentTheme = headerTheme;
  if (layout[0] === 'footer') firstComponentTheme = footerTheme;
  else if (layout[0] === 'container') firstComponentTheme = containerTheme;

  let lastComponentTheme = footerTheme;
  if (layout[layout.length - 1] === 'header') lastComponentTheme = headerTheme;
  else if (layout[layout.length - 1] === 'container') lastComponentTheme = containerTheme;

  return [
    firstComponentTheme.borderRadius,
    firstComponentTheme.borderRadius,
    lastComponentTheme.borderRadius,
    lastComponentTheme.borderRadius,
  ];
}
