import React, { HTMLAttributes, ReactNode } from 'react';
import css from './index.module.css';
import { sayHi } from '@magicbell/utils';

export type ThingProps = HTMLAttributes<HTMLDivElement> & {
  /** custom content */
  children?: ReactNode;
};

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556

/**
 * A custom Thing component. Neat!
 */
export function Thing({ children }: ThingProps) {
  if (__DEV__) {
    console.log(`I'll only be printed in dev envs`);
  }

  return <div className={css.thing}>{children || sayHi()}</div>;
}
