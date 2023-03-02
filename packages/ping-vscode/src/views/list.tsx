import { VSCodeDataGrid, VSCodeDataGridCell, VSCodeDataGridRow } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';

import { signalKeys } from '../constants';
import { useKeydown, useMessenger, useRemoteSignal } from '../lib/hooks';
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
  const messenger = useMessenger();

  const [selectedNoteIds, updateSelectedIds] = React.useState<Array<string>>([]);
  const [notifications] = useRemoteSignal<Array<any>>(signalKeys.NOTIFICATIONS);
  const [active, setActive] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);
  const handleClick = (idx: number) => {
    if (idx < 0 || idx >= notifications.length) {
      console.warn('Tried to select notification out of bounds: ', idx);
      return;
    }
    const notification = notifications[idx];
    setActive(notification);
    updateSelectedIds([notification.id]);
  };

  function limMin(idx: number) {
    return Math.max(idx, 0);
  }
  function limMax(idx: number) {
    return Math.min(idx, notifications.length - 1);
  }

  function getNotificationById(id: string): any | null {
    return notifications.find((n) => n.id === id) ?? null;
  }

  function getFirstCurrentlySelectedIdx(): number | null {
    if (selectedNoteIds.length === 0) return null;
    return notifications.findIndex((n) => n.id === selectedNoteIds[0]);
  }

  function getLastCurrentlySelectedIdx(): number | null {
    if (selectedNoteIds.length === 0) return null;
    return notifications.findIndex((n) => n.id === selectedNoteIds.slice(-1).pop());
  }

  function handleKeyDown({ key }) {
    // console.log('key: ', key, active);
    const firstSelectedNoteIdx = getFirstCurrentlySelectedIdx();
    const lastSelectedNoteIdx = getLastCurrentlySelectedIdx();
    switch (String(key)) {
      case 'Escape':
        setActive(null);
        updateSelectedIds([]);
        break;
      case 'ArrowUp':
        // Select the previouis single note, starting from the first one from the current selection, or select the last one.
        if (firstSelectedNoteIdx === null) {
          handleClick(limMin(notifications.length - 1));
          return;
        }
        handleClick(limMin(firstSelectedNoteIdx - 1));
        break;
      case 'ArrowDown':
        // Select the next single note, starting from the first one from the collection, or select the first one.
        if (firstSelectedNoteIdx === null) {
          handleClick(0);
          return;
        }
        handleClick(limMax(firstSelectedNoteIdx + 1));
        break;
      case 'Backspace':
        const archivableIds = [...selectedNoteIds];

        // Try to select the next element already before archiving the old ones.
        let nextId = lastSelectedNoteIdx + 1;
        if (nextId >= notifications.length - 1) {
          // We archived the last element, try select the element right before the selection.
          nextId = firstSelectedNoteIdx - 1;
        }
        if (nextId < 0) {
          // We have no more notifications, clear selection.
          setActive(null);
          updateSelectedIds([]);
        } else {
          handleClick(nextId);
        }

        for (const nId of archivableIds) {
          messenger.post('archive', nId);
        }
        break;
      case 'Enter':
        if (selectedNoteIds.length === 0) {
          return;
        }
        const note = getNotificationById(selectedNoteIds[0]);
        messenger.post('open-url', note.action_url);
        break;
      case 'a':
        // Show the first note.
        handleClick(0);
        // Select all notes.
        updateSelectedIds(notifications.map((n) => n.id));
        break;
    }
  }
  useKeydown(handleKeyDown);

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
                onClick={() => handleClick(idx)}
                category={notification.category}
              />
            </VSCodeDataGridCell>
          </VSCodeDataGridRow>
        ))}
      </VSCodeDataGrid>
    </div>
  );
}
