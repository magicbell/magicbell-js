import { VSCodeDataGrid, VSCodeDataGridCell, VSCodeDataGridRow } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';

import { signalKeys } from '../constants';
import { useRemoteSignal } from '../lib/hooks';
import { Notification } from '../ui/notification';

function getSentDate(notification) {
  if (notification.custom_attributes.source === 'github') {
    return new Date(notification.custom_attributes.source_notification.updated_at);
  }

  return new Date(notification.sent_at * 1000);
}

function getTitle(notification) {
  if (notification.custom_attributes.source === 'github') {
    const repo = notification.custom_attributes.source_notification.repository;
    return `${repo.owner.login}/${repo.name}`;
  }

  return notification.category
    .replace(/([A-Z]+)/g, ' $1')
    .toLowerCase()
    .trim();
}

function getOwnerAvatarUrl(notification) {
  if (notification.custom_attributes.source === 'github') {
    return notification.custom_attributes.source_notification.repository.owner.avatar_url;
  }
}

export function List() {
  const [notifications] = useRemoteSignal(signalKeys.NOTIFICATIONS);
  const [active, setActive] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);
  const handleClick = (notification) => setActive(notification);

  return (
    <div>
      <VSCodeDataGrid>
        {notifications?.map((notification) => (
          <VSCodeDataGridRow key={notification.id}>
            <VSCodeDataGridCell gridColumn="1">
              <Notification
                id={notification.id}
                actionUrl={notification.action_url}
                avatarUrl={getOwnerAvatarUrl(notification)}
                active={active?.id === notification.id}
                title={getTitle(notification)}
                sent_at={getSentDate(notification)}
                content={notification.title}
                onClick={() => handleClick(notification)}
                category={notification.category}
              />
            </VSCodeDataGridCell>
          </VSCodeDataGridRow>
        ))}
      </VSCodeDataGrid>
    </div>
  );
}
