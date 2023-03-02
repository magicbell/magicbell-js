import { VSCodeDataGrid, VSCodeDataGridCell, VSCodeDataGridRow } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';

import { signalKeys } from '../constants';
import { useKeydown as useKeylogger, useRemoteSignal } from '../lib/hooks';
import { useShortcuts } from '../lib/shortcut-hooks';
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
  const [activeKeys, resetActiveKeys] = useKeylogger();
  const [active, setActive] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);
  const [selectedNoteIds, updateSelectedIds] = React.useState<Array<string>>([]);
  const [notifications] = useRemoteSignal<Array<any>>(signalKeys.NOTIFICATIONS);

  const getNoteById = (id: string) => notifications.find((n) => n.id === id);

  const select = (ids: Array<string>) => {
    resetActiveKeys();
    if (ids.length === 0) {
      setActive(null);
      updateSelectedIds([]);
      return;
    }

    const newIds = ids.filter((id) => !selectedNoteIds.includes(id));
    if (newIds.length === 0) {
      return;
    }

    // Always show the first note of the selection.
    setActive(getNoteById(ids[0]));
    // Add the whole range to the selection.
    updateSelectedIds(ids);
  };

  useShortcuts(activeKeys, selectedNoteIds, select);
  return (
    <div>
      <VSCodeDataGrid>
        {notifications?.map((notification, idx) => (
          <VSCodeDataGridRow key={notification.id}>
            <VSCodeDataGridCell gridColumn="1">
              <Notification
                id={notification.id}
                actionUrl={notification.action_url}
                avatarUrl={getOwnerAvatarUrl(notification)}
                active={active?.id === notification.id || selectedNoteIds.includes(notification.id)}
                title={getTitle(notification)}
                sent_at={getSentDate(notification)}
                content={notification.title}
                onClick={() => select([notifications[idx].id])}
                category={notification.category}
              />
            </VSCodeDataGridCell>
          </VSCodeDataGridRow>
        ))}
      </VSCodeDataGrid>
    </div>
  );
}
