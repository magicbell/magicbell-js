import { VSCodeDataGrid, VSCodeDataGridCell, VSCodeDataGridRow } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';

import { signalKeys } from '../constants';
import { useKeydown, useMessenger, useRemoteSignal } from '../lib/hooks';
import { NotesSelection } from '../lib/ui-models';
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

  const [selectionRange, setSelection] = React.useState<NotesSelection>({
    from: -1,
    to: -1,
  });
  // const [selectedNoteIds, updateSelection] = React.useState<Array<string>>([]);
  const [notifications] = useRemoteSignal<Array<any>>(signalKeys.NOTIFICATIONS);
  const [active, setActive] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);
  const handleClick = (idx: number) => {
    if (idx < 0 || idx >= notifications.length) {
      console.warn('Tried to select notification out of bounds: ', idx);
      return;
    }
    const notification = notifications[idx];
    setActive(notification);
    setSelection({ from: idx, to: idx });
  };

  function limMin(idx: number) {
    return Math.max(idx, 0);
  }
  function limMax(idx: number) {
    return Math.min(idx, notifications.length - 1);
  }

  function handleKeyDown({ key }) {
    // console.log('key: ', key, active);
    switch (String(key)) {
      case 'Escape':
        setActive(null);
        setSelection({ from: -1, to: -1 });
        break;
      case 'ArrowUp':
        // Select the next single note, starting from the top most one.
        handleClick(limMin(selectionRange.from - 1));
        // setSelection({ from: limMin(selectionRange.from - 1), to: limMin(selectionRange.from - 1) });
        break;
      case 'ArrowDown':
        // Select the next single note, starting from the top most one.
        handleClick(limMax(selectionRange.from + 1));
        // setSelection({ from: limMax(selectionRange.from + 1), to: limMax(selectionRange.from + 1) });
        break;
      case 'Backspace':
        const archivable = [];
        for (let i = selectionRange.from; i <= selectionRange.to; i++) {
          archivable.push(notifications[i]);
        }

        // Select the next element already before archiving the old ones.
        handleClick(limMax(selectionRange.to + 1));

        for (const n of archivable) {
          messenger.post('archive', n.id);
        }
        break;
      case 'Enter':
        if (selectionRange.from >= 0) {
          const url = notifications[selectionRange.from].action_url;
          messenger.post('open-url', url);
        }
        break;
      case 'a':
        // Show the first note.
        handleClick(0);
        // Select all notes.
        setSelection({ from: 0, to: notifications.length });
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
                active={active?.id === notification.id || (idx >= selectionRange.from && idx <= selectionRange.to)}
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
