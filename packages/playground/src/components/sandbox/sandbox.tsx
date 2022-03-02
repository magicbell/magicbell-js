import {
  ClasserProvider,
  FileTabs,
  SandpackCodeEditor,
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
  SandpackSetup,
  SandpackThemeProvider,
  UnstyledOpenInCodeSandboxButton,
  useClasser,
} from '@codesandbox/sandpack-react';
import { ExternalLinkIcon, ReloadIcon } from '@radix-ui/react-icons';
import cn from 'clsx';
import React, { useMemo, useState } from 'react';

import { classes, theme } from './theme';
import { stripIndent } from './utils';

export type PlaygroundProps = {
  files: SandpackFiles;
  setup?: SandpackSetup;
  template?: SandpackPredefinedTemplate;
  define?: Record<string, unknown>;
  height?: string;
};

function template(string, data) {
  if (!data) return string;

  return string.replace(/__(\w*)__/g, (m, key) => data[key] ?? `__${key}__`);
}

function formatCode(code: string, define): string {
  return template(stripIndent(code).trim(), define) + '\n';
}

function Sandbox({
  files,
  setup,
  template,
  define,
  height = '300px',
}: PlaygroundProps) {
  const c = useClasser('pg');
  const [resetKey, setResetKey] = useState(0);

  const customSetup = useMemo(() => {
    const allFiles: SandpackFiles = { ...setup?.files, ...files };

    for (const key of Object.keys(allFiles)) {
      const file = allFiles[key];
      if (typeof file === 'object') {
        file.code = formatCode(file.code, define);
      } else {
        allFiles[key] = { code: formatCode(String(allFiles[key]), define) };
      }
    }
    return { ...setup, files: allFiles };
  }, [setup, files, define]);

  return (
    <SandpackProvider
      key={resetKey}
      template={template}
      customSetup={customSetup}
      activePath={Object.entries(files).find((x) => x['active'])?.[0]}
    >
      <ClasserProvider classes={classes}>
        <SandpackThemeProvider theme={theme}>
          <header className={c('header')}>
            <FileTabs />
            <div className={c('actions')}>
              <button
                className={c('button')}
                onClick={() => setResetKey((c) => c + 1)}
              >
                <ReloadIcon width="12" />
                Reset
              </button>
              <UnstyledOpenInCodeSandboxButton className={c('button')}>
                <ExternalLinkIcon />
                Fork
              </UnstyledOpenInCodeSandboxButton>
            </div>
          </header>

          <div
            className={cn('sp-layout', c('layout'))}
            style={{
              '--sp-layout-height': height,
            }}
          >
            <SandpackCodeEditor
              showTabs={false}
              showLineNumbers
              showInlineErrors
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
            />
          </div>
        </SandpackThemeProvider>
      </ClasserProvider>
    </SandpackProvider>
  );
}

export default Sandbox;
