import { openDB } from 'idb';

/**
 * Open the MagicBell's IndexedDB database.
 *
 * @returns the database
 */
export async function getDB() {
  const version = 1;

  return await openDB('magicbell', version, {
    upgrade(db) {
      db.createObjectStore('projects', { keyPath: 'id' });
      db.createObjectStore('users', { keyPath: 'id' });
    },
  });
}

/**
 * Save an object in the MagicBell's IndexedDB database.
 *
 * @param obj Object to store
 * @param storeName Name of the IndexedDB object store
 */
export async function save(obj, storeName: string) {
  const db = await getDB();
  await db.put(storeName, obj);
}

/**
 * Fetch an object from the MagicBell's IndexedDB database by ID.
 *
 * @param id ID of the object to retrieve
 * @param storeName Name of the IndexedDB object store
 */
export async function find(id: number | string, storeName: string) {
  const db = await getDB();
  const obj = await db.get(storeName, id);
  return obj || null;
}

/**
 * Fetch an object from the MagicBell's IndexedDB database by index.
 *
 * @param value Value
 * @param storeName Name of the IndexedDB object store
 * @param indexName Name of the IndexedDB index
 */
export async function findByIndex(value: number | string, storeName: string, indexName: string) {
  const db = await getDB();
  const obj = await db.getFromIndex(storeName, indexName, value);
  return obj || null;
}
