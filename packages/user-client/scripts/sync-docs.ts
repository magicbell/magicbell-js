/* eslint-disable no-console */
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { replaceBlock } from '@magicbell/codegen';
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO_OWNER = 'smeijer';
const REPO_NAME = 'test';
const FILE_PATH = 'src/docs/the-doc-to-update.mdx'; //'src/docs/docs/03-libraries/javascript-user-client.mdx';
const BRANCH_NAME = 'magicbella/update-sdk-docs';
const BASE_BRANCH = 'main';

if (!GITHUB_TOKEN) {
  console.log('GITHUB_TOKEN environment variable is missing');
  process.exit(1);
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function fetchMainBranchSha() {
  const response = await octokit.git.getRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${BASE_BRANCH}`,
  });
  return response.data.object.sha;
}

async function ensureBranchFromMain() {
  const mainBranchSha = await fetchMainBranchSha();

  try {
    await octokit.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${BRANCH_NAME}`,
      sha: mainBranchSha,
    });
    console.log(`Branch ${BRANCH_NAME} created successfully.`);
  } catch (error: any) {
    if (error.status === 422 && error.message.includes('Reference already exists')) {
      console.log(`Branch ${BRANCH_NAME} already exists. Ensuring it's up to date.`);
      await octokit.git.updateRef({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        ref: `heads/${BRANCH_NAME}`,
        sha: mainBranchSha,
        force: true,
      });
    } else {
      throw error;
    }
  }
}

async function fetchFileContent() {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      ref: BRANCH_NAME,
    });

    const fileContent = Buffer.from(response.data['content'], 'base64').toString('utf-8');
    return { content: fileContent, sha: response.data['sha'], exists: true };
  } catch (error: any) {
    if (error.status === 404) {
      return { content: '', sha: '', exists: false };
    } else {
      throw error;
    }
  }
}

async function updateFile(content: string, sha: string) {
  const updatedContent = Buffer.from(content).toString('base64');

  await octokit.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: FILE_PATH,
    message: 'docs: update sdk documentation',
    content: updatedContent,
    branch: BRANCH_NAME,
    sha: sha,
  });
}

async function createOrUpdatePullRequest() {
  const { data: pullRequests } = await octokit.pulls.list({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    state: 'open',
    head: `${REPO_OWNER}:${BRANCH_NAME}`,
    base: BASE_BRANCH,
  });

  const title = 'docs: update sdk documentation';
  const body = 'Automated update of sdk documentation';

  if (pullRequests.length > 0) {
    const pr = pullRequests[0];
    console.log(`Pull request #${pr.number} already exists. Updating...`);
    await octokit.pulls.update({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      pull_number: pr.number,
      title,
      body,
    });
  } else {
    console.log('Creating new pull request.');
    await octokit.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      head: BRANCH_NAME,
      base: BASE_BRANCH,
      title,
      body,
    });
  }
}

function getMarkdownSection(markdown: string, sectionTitle: string) {
  const lines = markdown.split('\n');
  const matcher = sectionTitle.startsWith('#')
    ? (line) => line.trim() === sectionTitle.trim()
    : (line) => line.trim().endsWith(`# ${sectionTitle}`);

  const startIndex = lines.findIndex(matcher);

  if (startIndex === -1) {
    return null; // Section not found
  }

  const needle = sectionTitle.split(' ')[0] + ' ';

  const endIndex = lines.findIndex((line, index) => {
    if (index <= startIndex) return false;
    return line.startsWith(needle);
  });

  const sectionLines = lines.slice(startIndex + 1, endIndex === -1 ? undefined : endIndex);

  return {
    title: sectionTitle.replace(needle, '').trim(),
    content: sectionLines.join('\n').trim(),
    startIndex,
    endIndex,
  };
}

export async function syncDocs() {
  try {
    const readme = await fs.readFile(path.join(__dirname, '..', 'README.md'), { encoding: 'utf-8' });
    const allMethods = getMarkdownSection(readme, '## All Methods');

    await ensureBranchFromMain();
    const { content, sha, exists } = await fetchFileContent();
    const patchedContent = replaceBlock(content, 'ALL_METHODS', allMethods.content);

    if (content === patchedContent) {
      console.log('files are already up to date');
      return;
    }

    await updateFile(patchedContent, exists ? sha : '');
    await createOrUpdatePullRequest();
    console.log('Pull request processed successfully.');
  } catch (error) {
    console.error('Error updating documentation:', error);
  }
}

syncDocs().catch((e) => {
  console.error(e);
  process.exit(1);
});
