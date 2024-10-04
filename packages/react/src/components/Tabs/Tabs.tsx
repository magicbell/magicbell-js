/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Children, ReactComponentElement, ReactNode } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import Text from '../Text/index.js';

function isTab(child: unknown): child is ReactComponentElement<typeof Tab> {
  return child != null && typeof child === 'object' && child['type'] === Tab;
}

function Tabs({
  children,
  active,
  onChange,
}: {
  children: React.ReactNode;
  active?: string;
  onChange: (value: string) => void;
}) {
  const { tabs } = useTheme();

  const style = css`
    margin: ${tabs.margin} !important;

    & > * + * {
      margin-left: ${tabs.spacing} !important;
    }
  `;

  return (
    <div css={style} role="tablist">
      {Children.toArray(children)
        .filter(isTab)
        .map((child, idx) => ({
          ...child,
          props: {
            ...child.props,
            'data-selected': active ? child.props.value === active : idx === 0,
            onClick: () => onChange(child.props.value),
          },
        }))}
    </div>
  );
}

function Tab({ children, value, ...props }: { children: ReactNode; value: string; 'data-selected'?: boolean }) {
  const { tabs } = useTheme();

  // use [aria-selected] to increase specificity, we'll lose from header > button without it
  const style = css`
    &[aria-selected] {
      padding: 10px 8px 12px !important;
      font-weight: ${tabs.fontWeight} !important;
      line-height: 1.5 !important;
      font-size: ${tabs.fontSize} !important;
      color: ${tabs.color} !important;

      &[aria-selected='true'] {
        color: ${tabs.activeColor} !important;
        box-shadow: inset 0px -2px 0px ${tabs.activeColor};
      }
    }
  `;

  return (
    <button {...props} css={style} role="tab" aria-selected={Boolean(props['data-selected'])}>
      {typeof children === 'string' ? <Text id={`tab.${value}`} defaultMessage={children} /> : children}
    </button>
  );
}

Tabs.Tab = Tab;

export default Tabs;
