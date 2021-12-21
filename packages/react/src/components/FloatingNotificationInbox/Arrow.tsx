/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext';

export interface Props {
  placement:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
}

/**
 * Arrow component for popper.
 *
 * @example
 * <Arrow placement="right" />
 */
export default function Arrow({ placement }: Props) {
  const theme = useTheme();
  const { header: headerTheme, footer: footerTheme } = theme;

  return (
    <div
      data-popper-arrow
      data-popper-placement={placement}
      css={css`
        &,
        &:before {
          position: absolute;
          width: 18px !important;
          height: 18px !important;
          z-index: -1;
          border-radius: 2px !important;
        }

        &:before {
          content: '';
          transform: rotate(45deg);
          left: 0;
        }

        &[data-popper-placement^='top'] {
          bottom: -4px;

          &:before {
            background: ${headerTheme.backgroundColor};
          }
        }

        &[data-popper-placement^='bottom'] {
          top: -4px;

          &:before {
            background: ${footerTheme.backgroundColor};
          }
        }

        &[data-popper-placement^='left'] {
          right: -4px;
        }

        &[data-popper-placement^='right'] {
          left: -4px;
        }
      `}
    />
  );
}
