import { openDB } from 'idb';

/**
 * Open the MagicBell's indexDB database.
 *
 * @returns the database
 */
export async function getDB() {
  const version = 1;
  return await openDB('magicbell', version, {
    upgrade(db) {
      db.createObjectStore('projects', { keyPath: 'id' });
    },
  });
}

/**
 * Store a project in the MagicBell's IndexDB database.
 *
 * @param project - Project to store
 */
export async function storeProject(project) {
  const db = await getDB();
  await db.put('projects', project);
}

/**
 * Get a project from the MagicBell's IndexDB database.
 *
 * @param projectId - ID of the project to retrieve
 */
export async function getProject(projectId: number) {
  const db = await getDB();
  return await db.get('projects', projectId);
}
