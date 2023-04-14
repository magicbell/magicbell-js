import { OpenAPI, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

type Modify<T, R> = Omit<T, keyof R> & R;
export type SchemaObject = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;

export type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;

export function isSchemaObject(schema: SchemaObject): schema is OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject {
  return schema && !('$ref' in schema);
}

export function schemaToObject(schema: SchemaObject | ReferenceObject) {
  if (schema == null || !('type' in schema)) return null;

  if (schema.type === 'object' || !schema.type) {
    return Object.keys(schema.properties || {}).reduce(
      (acc, key) => Object.assign(acc, { [key]: schemaToObject(schema.properties[key]) }),
      {},
    );
  }

  if (schema.type === 'array') {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items];
    return items.map((item) => schemaToObject(item));
  }

  if (schema.type === 'string') {
    return '…';
  }

  if (schema.type === 'integer') {
    return 1;
  }

  if (schema.type === 'boolean') {
    return true;
  }

  if (schema.type) {
    throw new Error(`unimplemented schema type: ${schema.type}`);
  }

  return schema;
}

export function isEmptySchema(schema: unknown) {
  return (
    typeof schema !== 'object' ||
    schema == null ||
    !('type' in schema) ||
    ((schema as any).type === 'object' && !(schema as any).properties) ||
    ((schema as any).type === 'array' && !(schema as any).items)
  );
}

export function getSuccessStatusCode(operation: OpenAPI.Operation) {
  return Object.keys(operation?.responses || {})
    .map((x) => Number(x))
    .find((response) => response >= 200 && response <= 299);
}

export function getRequestBody(method: OpenAPI.Operation) {
  if (!method || typeof method !== 'object' || !('requestBody' in method && 'content' in method.requestBody)) {
    return null;
  }

  const content = method.requestBody.content['application/json'];
  if (!content) return null;

  return content as Modify<OpenAPIV3.MediaTypeObject, { schema?: SchemaObject }>;
}

export function getResponseBody(method: OpenAPI.Operation, code = getSuccessStatusCode(method)) {
  const response = method?.responses?.[code];
  if (!response || typeof response !== 'object' || !('content' in response && 'application/json' in response.content)) {
    return null;
  }

  const content = response.content['application/json'];
  if (!content) return null;

  return content as Modify<OpenAPIV3.MediaTypeObject, { schema?: SchemaObject }>;
}

export function getByRef(doc: OpenAPI.Document, ref: string) {
  const [ns, type, name] = ref.replace('#/', '').split('/');
  return doc[ns][type][name];
}
