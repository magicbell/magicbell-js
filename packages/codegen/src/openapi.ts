import parser from '@apidevtools/swagger-parser';
import axios from 'axios';
import fs from 'fs/promises';
import mergeAllOf from 'json-schema-merge-allof';
import { OpenAPI } from 'openapi-types';

import { getByRef, getRequestBody, getResponseBody, isEmptySchema, ReferenceObject, SchemaObject } from './schema';
import { camelCase, pascalCase, snakeCase } from './text';

export async function getOpenAPIDocument(file: string, options = { dereference: true }) {
  const parse = options.dereference ? parser.dereference.bind(parser) : parser.parse.bind(parser);

  const contents = /https?:\/\//.test(file)
    ? await axios.get(file).then((x) => x.data)
    : await fs.readFile(file, 'utf-8').then((x) => JSON.parse(x));

  return parse(contents);
}

export function getRootPaths(document: OpenAPI.Document) {
  const paths = Object.keys(document.paths);
  const rootPaths = paths.map((x) => x.split('/').filter(Boolean)[0]);
  return Array.from(new Set(rootPaths));
}

export type Method = {
  entity: string;
  path: string;
  method: string;
  name: string;
  group?: string;
  type?: string;
  beta: boolean;
  private: boolean;
  params?: SchemaObject[];
  data?: SchemaObject;
  returns?: SchemaObject;
} & OpenAPI.Operation;

export type Resource = {
  path: string;
  methods: Method[];
};

export function getRootPathMethods(document: OpenAPI.Document, path: string) {
  const paginationProps = Object.keys((document as any).components.schemas.PaginationProps?.properties || {});

  const methods: Array<Method> = [];
  const apiPaths = Object.keys(document.paths).filter((x) => x.startsWith(`/${path}`));

  // we're using "entity" to wrap data and unwrap response. We might want to improve this, and
  // decide whether and how to wrap/unwrap on the method level, instead of making the resource
  // level decide for the method.
  const body = getRequestBody(document.paths[`/${path}`].post) || getResponseBody(document.paths[`/${path}`].get);
  const schema = mergeAllOf(body.schema as any);
  let entity = Object.keys(schema.properties).find((x) => !paginationProps.includes(x));

  // this ain't nice, see comment above
  if (entity !== 'notification_preferences') {
    entity = entity.replace(/s$/, '');
  }

  for (const apiPath of apiPaths) {
    const [rootPath, subPath] = apiPath
      .replaceAll('_', '-')
      .split('/')
      .filter((x) => x && !x.includes('{'));

    for (const method of Object.keys(document.paths[apiPath])) {
      const operation = document.paths[apiPath][method];
      const resource = operation.operationId.slice(0, rootPath.length);
      // compute namespace
      const group = operation.operationId.startsWith(`${rootPath}-${subPath}-`) ? subPath : undefined;
      const name = camelCase(operation.operationId.slice(rootPath.length + 1 + (group ? subPath.length + 1 : 0)));
      const type = name === 'list' ? 'list' : null;

      const methodEntity = group ? snakeCase(group.replace(/s$/, '')) : entity;
      const methodPath = apiPath.replace(`/${path}`, '').replace(/^\//, '');

      const urlParams = (apiPath.match(/{\w+}/g) || []).map((param) => param.replace(/[{}]/g, ''));
      const params = urlParams.map((param) => {
        const source = operation.parameters.find((x) => x.in === 'path' && x.name === param);
        return {
          title: param,
          description: source?.description,
          type: 'string',
          ...source?.schema,
        };
      });

      // data is applied after url params, in an object, like notifications.create({ title: 'hi' })
      const query = (operation.parameters || [])
        .filter((x) => x.in === 'query')
        .map((x) => ({
          title: x.name,
          description: x.description,
          ...x.schema,
        }));

      // const requestOptions = operation.parameters?.filter((x) => x.in === 'header').map((x) => x.name) ?? [];
      const TypePrefix = [name, resource, group].filter(Boolean).map(pascalCase).join('');

      const requestBody = getRequestBody(operation)?.schema;
      const data = query.length
        ? {
            title: TypePrefix + 'PayloadSchema',
            type: 'object',
            properties: query.reduce((acc, x) => ({ ...acc, [x.title]: x }), {}),
            additionalProperties: false,
            required: query.filter((x) => x.required).map((x) => x.title),
          }
        : {
            title: TypePrefix + 'PayloadSchema',
            type: 'object',
            ...getSchema(document, requestBody, { entity, excludeReadOnly: true }),
            additionalProperties: false,
          };

      const successResponse = getResponseBody(operation)?.schema;

      const returns = {
        title: TypePrefix + 'ResponseSchema',
        description: successResponse?.['description'],
        ...getSchema(document, successResponse, { entity }),
      };

      methods.push({
        name,
        entity: methodEntity,
        type,
        group,
        path: methodPath,
        method,
        private: Boolean(operation['x-private']),
        beta: Boolean(operation['x-beta']),
        returns: isEmptySchema(returns) ? null : returns,
        params: params.filter((x) => !isEmptySchema(x)),
        data: isEmptySchema(data) ? null : data,
        ...operation,
      });
    }
  }

  return methods;
}

// TODO: move this out to the implementing side
function getSchema(
  doc: OpenAPI.Document,
  schema: SchemaObject | ReferenceObject,
  options: { entity: string; excludeReadOnly?: boolean },
) {
  if (!schema) return null;
  const maybeWrapped = '$ref' in schema ? getByRef(doc, schema.$ref) : schema;
  const unwrapped = maybeWrapped.properties?.[options.entity] || maybeWrapped;
  const unreffed = '$ref' in unwrapped ? getByRef(doc, unwrapped.$ref) : unwrapped;
  const objectSchema = mergeAllOf(unreffed);

  if (!options.excludeReadOnly || !objectSchema.properties) {
    return objectSchema;
  }

  const copy = { ...objectSchema, properties: {} };
  for (const [key, value] of Object.entries(objectSchema.properties || {})) {
    if (value?.['readOnly'] === true) continue;
    copy.properties[key] = objectSchema.properties[key];
  }

  return copy;
}
