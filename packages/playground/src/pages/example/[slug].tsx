import {
  SandpackFile,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react';
import { GetStaticPropsResult } from 'next';
import { useRef } from 'react';

import Navbar from '~/components/layout/navbar';
import Sidebar from '~/components/layout/sidebar';
import Sandbox from '~/components/sandbox/sandbox';
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

  const config = examples.find((x) => x.slug === slug);
  const files = reshapeForSandpack(example, config.template) || null;
  const dependencies = config.dependencies;
  const template = config.template;

  const props = { files, template, dependencies, examples, slug };

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
    <div
      className="h-screen grid grid-cols-2"
      style={{
        gridAutoRows: 'min-content 1fr', // auto-rows-[minmax(min-content,1fr)]
        gridTemplateColumns: '18rem 1fr',
      }}
    >
      <header className="col-span-full">
        <Navbar />
      </header>
      <div className="overflow-hidden">
        <Sidebar examples={examples} currentPath={slug} />
      </div>

      <div className="pb-8 pt-2 px-8 overflow-hidden">
        <div className="h-full" ref={contentRef}>
          <Sandbox
            key={slug} // remount component on page change
            template={template}
            define={{
              MAGICBELL_API_KEY: '...',
              MAGICBELL_USER_EMAIL: 'stephan.meijer@gmail.com',
              MAGICBELL_USER_KEY: '...',
            }}
            setup={{ dependencies }}
            files={files}
            height={`${height - 40}px`}
          />
        </div>
      </div>
    </div>
  );
}
