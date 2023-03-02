import { signalKeys } from '../constants';
import { code } from './code';
import { useRemoteSignal } from './hooks';
import { Messenger } from './messenger';

const messenger = new Messenger(code);

export function useShortcuts(
  activeKeys: Array<string>,
  selectedNoteIds: Array<string>,
  select: (notes: Array<string>) => void,
) {
  const [notifications] = useRemoteSignal<Array<any>>(signalKeys.NOTIFICATIONS);

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

  // console.log('key: ', key, active);
  const firstSelectedNoteIdx = getFirstCurrentlySelectedIdx();
  const lastSelectedNoteIdx = getLastCurrentlySelectedIdx();

  if (activeKeys.includes('a') && activeKeys.includes('Meta')) {
    if (notifications.length === 0) {
      return;
    }

    select(notifications.map((n) => n.id));
    return;
  }
  if (activeKeys.includes('Escape')) {
    select([]);
  }
  if (activeKeys.includes('ArrowDown')) {
    if (notifications.length === 0) {
      return;
    }

    // Select the next single note, starting from the first one from the collection, or select the first one.
    if (firstSelectedNoteIdx === null) {
      select([notifications[0].id]);
      return;
    }
    select([notifications[limMax(firstSelectedNoteIdx + 1)].id]);
  }
  if (activeKeys.includes('ArrowUp')) {
    if (notifications.length === 0) {
      return;
    }

    // Select the previouis single note, starting from the first one from the current selection, or select the last one.
    if (firstSelectedNoteIdx === null) {
      select([notifications.slice(-1)[0].id]);
      return;
    }
    select([notifications[limMin(firstSelectedNoteIdx - 1)].id]);
  }
  if (activeKeys.includes('Enter')) {
    if (selectedNoteIds.length === 0) {
      return;
    }
    const note = getNotificationById(selectedNoteIds[0]);
    messenger.post('open-url', note.action_url);
  }
  if (activeKeys.includes('e') && activeKeys.includes('Meta')) {
    const archivableIds = [...selectedNoteIds];
    // Try to select the next element already before archiving the old ones.
    let nextId = lastSelectedNoteIdx + 1;
    if (nextId >= notifications.length - 1) {
      // We archived the last element, try select the element right before the selection.
      nextId = firstSelectedNoteIdx - 1;
    }
    if (nextId < 0) {
      // We have no more notifications, clear selection.
      select([]);
    } else {
      select([notifications[nextId].id]);
    }

    for (const nId of archivableIds) {
      messenger.post('archive', nId);
    }
  }
}
