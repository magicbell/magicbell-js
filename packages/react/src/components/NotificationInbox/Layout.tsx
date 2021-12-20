import React from 'react';

interface LayoutProps {
  order: string[];
  children: React.ReactNode[];
}

/**
 * Component to sort the children based on the `order` property.
 *
 * @example
 * <Layout order={['footer']}>
 *   <p key="footer">Settings</p>
 * </Layout>
 */
export default function Layout({ order, children }: LayoutProps) {
  return (
    <>{order.map((key) => children.find((child: React.ReactElement) => child?.key === key))}</>
  );
}
