import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import os from 'os';
import { join } from 'path';

const _cache = new Map();
/**
 * Use a cache object, which is persisted to disk, if we have `homedir` available.
 * Fe vscode, does not have `homedir` available.
 */
export const config = {
  configDir: os && 'homedir' in os ? join(os.homedir(), '.magicbell') : null,

  get(path, initialValue = null) {
    if (_cache.has(path)) {
      return _cache.get(path);
    }

    let data = null;
    try {
      data = JSON.parse(readFileSync(join(this.configDir, path), 'utf-8') || 'null');
    } catch {}

    if (data != null) {
      _cache.set(path, data);
      return data;
    }

    if (initialValue != null) {
      this.set(path, initialValue);
      return initialValue;
    }

    return null;
  },

  set(path, data) {
    _cache.set(path, data);
    if (!this.configDir) return;
    mkdirSync(this.configDir, { recursive: true });
    writeFileSync(join(this.configDir, path), JSON.stringify(data, null, 2), 'utf-8');
  },

  delete(path) {
    _cache.delete(path);
    if (!this.configDir) return;
    unlinkSync(join(this.configDir, path));
  },
};
