import {
  SandpackFile,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react';
import { FileTextIcon } from '@radix-ui/react-icons';
import { GetStaticPropsResult } from 'next';
import { useRef } from 'react';

import Navbar from '~/components/layout/navbar';
import Sandbox from '~/components/sandbox/sandbox';
import Logo from '~/components/svg/logo';
import SlackLogo from '~/components/svg/slack';
import { useHeight } from '~/hooks/use-height';
import {
  ExampleConfig,
  getAllExamples,
  getFilesForExample,
  reshapeForSandpack,
} from '~/lib/utils';

export async function getStaticPaths() {
  const examples = await getAllExamples();

  return {
    paths: examples.map((example) => ({ params: { slug: example.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({
  params: { slug },
}): Promise<GetStaticPropsResult<ExampleProps>> {
  const [example, examples] = await Promise.all([
    getFilesForExample(slug),
    getAllExamples(),
  ]);

  const { template, dependencies } =
    examples.find((x) => x.slug === slug) || {};

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

export default function Example({
  files,
  dependencies,
  template,
  examples,
  slug,
}) {
  const contentRef = useRef();
  const height = useHeight(contentRef, 300);

  return (
    <div className="h-screen max-w-9xl px-8 pt-6 mx-auto flex flex-col">
      <header className="relative">
        <div className="flex w-full">
          <Logo />
        </div>
        <Navbar examples={examples} currentPath={slug} />
      </header>

      <div className="mt-6 h-full overflow-hidden relative">
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
            height={`${height - 40}px`}
          />
        </div>
      </div>

      <footer className="mt-6 mb-12 flex-row justify-end space-x-6 text-xs">
        <a href="https://magicbell.com/docs" className="flex-row fg-body">
          <FileTextIcon className="mr-2" /> Docs
        </a>
        <a
          href="https://join.slack.com/t/magicbell-community/shared_invite/zt-trh6yi84-~jtPqNikvC1m3My_p0WUqw"
          className="flex-row fg-body"
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          <SlackLogo className="mr-2" /> Slack
        </a>
      </footer>
    </div>
  );
}
