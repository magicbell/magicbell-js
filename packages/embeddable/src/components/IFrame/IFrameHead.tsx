import React from 'react';

export interface IFrameHeadProps {
  stylesheets?: string[];
}

/**
 * Content for the head of the iframe.
 *
 * @example
 * <IFrameHead stylesheets={['https://example.com/style.css]} />
 */
export default function IFrameHead({ stylesheets = [] }: IFrameHeadProps) {
  return (
    <>
      {stylesheets.map((stylesheet: string) => (
        <link key={stylesheet} href={stylesheet} rel="stylesheet" />
      ))}
    </>
  );
}
