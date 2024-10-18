import { SandpackFile, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { FileTextIcon } from '@radix-ui/react-icons';
import cn from 'clsx';
import { GetStaticPropsResult } from 'next';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import Navbar from '../components/layout/navbar';
import SocialHead from '../components/layout/social-head';
import Sandbox from '../components/sandbox/sandbox';
import GitHubLogo from '../components/svg/github';
import Logo from '../components/svg/logo';
import { useHeight } from '../hooks/use-height';
import { ExampleConfig, getAllExamples, getFilesForExample, reshapeForSandpack } from '../lib/utils';

export async function getStaticPaths() {
  const examples = await getAllExamples();

  return {
    paths: examples.map((example) => ({ params: { slug: example.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { slug } }): Promise<GetStaticPropsResult<ExampleProps>> {
  const [example, examples] = await Promise.all([getFilesForExample(slug), getAllExamples()]);

  const { template, dependencies } = examples.find((x) => x.slug === slug) || {};

  if (!template) {
    return { notFound: true };
  }

  const files = (await reshapeForSandpack(example, template)) || null;

  const props = {
    files,
    template,
    dependencies,
    examples,
    slug,
  };

  return { props };
}

type ExampleProps = {
  files: Record<string, SandpackFile>;
  template: SandpackPredefinedTemplate;
  dependencies: Record<string, string>;
  examples: ExampleConfig[];
  slug: string;
};

export default function Example({ files, dependencies, template, examples, slug }) {
  const contentRef = useRef();
  let height = useHeight(contentRef, 300);
  const params = useSearchParams();
  const embedded = params.has('embed');

  height = Math.max(height, 300);

  const example = examples.find((x) => x.slug === slug);
  const name = slug
    .split('-')
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ');

  useEffect(() => {
    if (embedded) {
      document.body.classList.add('embed');
    }
  }, [embedded]);

  const editor = (
    <div className={cn('h-full max-h-screen overflow-hidden relative', { 'mt-6': !embedded })}>
      <div className="h-full" ref={contentRef}>
        <Sandbox
          key={slug} // remount component on page change
          template={template}
          define={{
            MAGICBELL_API_KEY: 'e1f70f214b0be42a8efde915af39feacc956b06b',
            MAGICBELL_USER_EMAIL: 'person@example.com',
            MAGICBELL_USER_KEY: '...',
          }}
          setup={{ dependencies }}
          files={files}
          height={`${height - (embedded ? 0 : 40)}px`}
        />
      </div>
    </div>
  );

  if (embedded) {
    return editor;
  }

  return (
    <>
      <SocialHead title={`${name} | MagicBell Playground`} description={example.description} />
      <div className="h-screen max-w-9xl px-8 pt-6 mx-auto flex flex-col">
        <header className="relative">
          <div className="flex w-full">
            <Logo />
          </div>
          <Navbar examples={examples} currentPath={slug} />
        </header>

        {editor}

        <footer className="mt-6 mb-12 flex-row justify-end space-x-6 text-xs">
          <a href="https://magicbell.com/docs" className="flex-row fg-body">
            <FileTextIcon className="mr-2" /> Docs
          </a>
          <a
            href="https://github.com/orgs/magicbell/discussions"
            className="flex-row fg-body"
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            <GitHubLogo className="mr-2" /> Discussions
          </a>
        </footer>
      </div>
    </>
  );
}
