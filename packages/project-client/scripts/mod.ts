import { fileURLToPath } from 'node:url';

import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function addHttpClientHeaderHandler(project: Project) {
  const file = project.getSourceFileOrThrow('./src/http/client.ts');
  const httpClient = file.getClassOrThrow('HttpClient');
  const constructor = httpClient.getConstructors()[0];

  const importPath = './handlers/mb-header-handler';

  const existingImport = file.getImportDeclaration((dec) => {
    return dec.getModuleSpecifierValue() === importPath;
  });

  if (!existingImport) {
    file.addImportDeclaration({
      moduleSpecifier: importPath,
      namedImports: [{ name: 'HeaderHandler' }],
    });
  }

  const newHandlerLine = 'this.requestHandlerChain.addHandler(new HeaderHandler());';

  const alreadyHasHandler = constructor.getStatements().some((statement) => {
    return statement.getText() === newHandlerLine;
  });

  if (!alreadyHasHandler) {
    constructor.insertStatements(0, newHandlerLine);
  }
}

function addHeaderHandlerFile(project: Project) {
  const sourceFilePath = path.join(__dirname, 'mods', 'mb-header-handler.ts');
  const targetFilePath = './src/http/handlers/mb-header-handler.ts';

  const contents = fs.readFileSync(sourceFilePath, { encoding: 'utf-8' });
  const file = project.createSourceFile(targetFilePath, contents, { overwrite: true });

  // fix import paths
  file.getImportDeclarations().forEach((dec) => {
    const moduleSpecifierValue = dec.getModuleSpecifierValue();

    const newModuleSpecifierValue = path.relative(
      path.dirname(targetFilePath),
      path.resolve(path.dirname(sourceFilePath), moduleSpecifierValue),
    );

    dec.setModuleSpecifier(newModuleSpecifierValue);
  });
}

function addHeadersToSdkConfig(project: Project) {
  const file = project.getSourceFileOrThrow('./src/http/types.ts');
  const sdkConfig = file.getInterfaceOrThrow('SdkConfig');

  if (!sdkConfig.getProperty('headers')) {
    sdkConfig.addProperty({
      name: 'headers',
      type: 'Record<string, string>',
      hasQuestionToken: true,
    });
  }
}

export async function applyCodeMods() {
  const project = new Project({
    tsConfigFilePath: path.join(__dirname, '..', 'tsconfig.build.json'),
  });

  addHeaderHandlerFile(project);
  addHttpClientHeaderHandler(project);
  addHeadersToSdkConfig(project);
  await project.save();
}
