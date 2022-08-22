import React from 'react';

import Tabs from '../Tabs/Tabs';

export type HeaderTabsProps = {
  activeTab: string;
  onChange: (value: string) => void;
  tabsConfig: Array<{ storeId: string; label: string }>;
};

function HeaderTabs({ tabsConfig, activeTab, onChange }: HeaderTabsProps) {
  return (
    <Tabs active={activeTab} onChange={onChange}>
      {tabsConfig?.map(({ storeId, label }) => (
        <Tabs.Tab key={storeId} value={storeId}>
          {label}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}

export default HeaderTabs;
