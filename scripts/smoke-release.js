#!/usr/bin/env node
// Smoke-tests a release candidate of magicbell-js and @magicbell/cli against the real MagicBell API.
//
//   node scripts/smoke-release.js <pr-number>   # the PR's pkg.pr.new preview packages
//   node scripts/smoke-release.js local         # this checkout's built packages (run `yarn build` first)
//
// Needs credentials for a test MagicBell project (never production; this sends a real notification):
// MAGICBELL_PROJECT_TOKEN, MAGICBELL_API_KEY and MAGICBELL_SECRET_KEY.
// It creates a throwaway user, broadcasts one in-app notification to them, reads, marks and archives it
// through the user client, checks the CLI, and deletes the user again.
import { execFileSync } from 'node:child_process';
import { createHmac, randomUUID } from 'node:crypto';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/smoke-release.js <pr-number|local>');
  process.exit(2);
}

const env = Object.fromEntries(
  ['MAGICBELL_PROJECT_TOKEN', 'MAGICBELL_API_KEY', 'MAGICBELL_SECRET_KEY'].map((name) => [name, process.env[name]]),
);
const missing = Object.keys(env).filter((name) => !env[name]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  process.exit(2);
}

let require;
let cliBin;
if (target === 'local') {
  require = createRequire(resolve('packages/magicbell-js/package.json'));
  cliBin = resolve('packages/cli/bin/magicbell.js');
} else {
  const dir = mkdtempSync(join(tmpdir(), 'magicbell-smoke-'));
  writeFileSync(join(dir, 'package.json'), '{"private":true}');
  console.log(`Installing pkg.pr.new previews for PR #${target} into ${dir}`);
  execFileSync(
    'npm',
    [
      'install',
      '--no-fund',
      '--no-audit',
      `https://pkg.pr.new/magicbell-js@${target}`,
      `https://pkg.pr.new/@magicbell/cli@${target}`,
    ],
    { cwd: dir, stdio: 'inherit' },
  );
  require = createRequire(join(dir, 'package.json'));
  cliBin = join(dir, 'node_modules/.bin/magicbell');
}

const { Client: ProjectClient } = require('magicbell-js/project-client');
const { Client: UserClient } = require('magicbell-js/user-client');
console.log(`magicbell-js ${require('magicbell-js/package.json').version}`);

function base64url(value) {
  return Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
}

// The same user JWT example/nextjs-webpush signs with jsonwebtoken.
function userToken(externalId) {
  const now = Math.floor(Date.now() / 1000);
  const body = `${base64url({ alg: 'HS256', typ: 'JWT' })}.${base64url({
    user_email: null,
    user_external_id: externalId,
    api_key: env.MAGICBELL_API_KEY,
    iat: now,
    exp: now + 600,
  })}`;
  return `${body}.${createHmac('sha256', env.MAGICBELL_SECRET_KEY).update(body).digest('base64url')}`;
}

let failures = 0;
async function check(name, fn) {
  try {
    const detail = await fn();
    console.log(`ok   ${name}${detail ? ` (${detail})` : ''}`);
    return true;
  } catch (error) {
    failures++;
    console.log(`FAIL ${name}: ${error?.message ?? error}`);
    return false;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

const project = new ProjectClient({ token: env.MAGICBELL_PROJECT_TOKEN });
const externalId = `smoke-${randomUUID()}`;
const title = `Release smoke test ${externalId}`;
let userId;
let broadcastId;
let notificationId;

await check('project: save user', async () => {
  const { data } = await project.users.saveUser({ externalId, email: `${externalId}@example.com` });
  userId = data?.id;
  assert(userId, 'response has no user id');
  assert(data.externalId === externalId, `externalId is ${data.externalId}`);
  return userId;
});

await check('project: list users', async () => {
  const { data } = await project.users.listUsers({ limit: 1 });
  assert(Array.isArray(data?.data), 'response has no data array');
});

await check('project: create broadcast', async () => {
  const { data } = await project.broadcasts.createBroadcast({
    title,
    content: 'Sent by scripts/smoke-release.js',
    recipients: [{ externalId }],
  });
  broadcastId = data?.id;
  assert(broadcastId, 'response has no broadcast id');
  return broadcastId;
});

if (broadcastId) {
  await check('project: fetch broadcast', async () => {
    const { data } = await project.broadcasts.fetchBroadcast(broadcastId);
    assert(data?.title === title, `title is ${data?.title}`);
  });
}

const user = new UserClient({ token: userToken(externalId) });

await check('user: notification arrives', async () => {
  for (let attempt = 0; attempt < 15 && !notificationId; attempt++) {
    if (attempt) await sleep(2000);
    const { data } = await user.notifications.listNotifications({ limit: 10 });
    notificationId = data?.data?.find((notification) => notification.title === title)?.id;
  }
  assert(notificationId, 'broadcast notification not delivered within 30s');
  return notificationId;
});

if (notificationId) {
  await check('user: mark read', async () => {
    await user.notifications.markNotificationRead(notificationId);
    const { data } = await user.notifications.fetchNotification(notificationId);
    assert(data?.readAt, 'readAt is not set');
  });
  await check('user: archive', async () => {
    await user.notifications.archiveNotification(notificationId);
    const { data } = await user.notifications.fetchNotification(notificationId);
    assert(data?.archivedAt, 'archivedAt is not set');
  });
}

await check('cli: --version', () => execFileSync('node', [cliBin, '--version'], { encoding: 'utf8' }).trim());

await check('cli: broadcasts list', () => {
  const out = execFileSync(
    'node',
    [cliBin, '--no-color', '--token', env.MAGICBELL_PROJECT_TOKEN, 'broadcasts', 'list', '--per-page', '1'],
    { encoding: 'utf8', env: { ...process.env, MAGICBELL_PROFILE: 'smoke-test' } },
  );
  JSON.parse(out);
});

if (userId) {
  await check('project: delete user', () => project.users.deleteUser(userId).then(() => undefined));
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
