export type Explode = boolean;
export type QueryStyles = 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
export type PathStyles = 'simple' | 'label' | 'matrix';

const styleMethods: Record<string, Function> = {
  simple: (value: unknown, explode: boolean) => {
    // Check if the value is an array
    if (Array.isArray(value)) {
      return explode ? value.join(',') : value.join();
    }

    // Check if the value is an object
    if (typeof value === 'object' && value !== null) {
      if (explode) {
        // Serialize object with exploded format: "key=value,key2=value2"
        return Object.entries(value)
          .map(([parameterName, parameterValue]) => `${parameterName}=${parameterValue}`)
          .join(',');
      }
      // Serialize object with non-exploded format: "key,value,key2,value2"
      return Object.entries(value)
        .flatMap(([parameterName, parameterValue]) => [parameterName, parameterValue])
        .join(',');
    }

    // For primitive values
    return String(value);
  },
};

export function serializePath(style: PathStyles, explode: Explode, value: unknown, key?: string): string {
  const method = styleMethods[style];
  if (!method) return '';
  // The `simple` and `label` styles do not require a `key`
  if (!key) {
    return method(value, explode);
  } else {
    return method(key, value, explode);
  }
}
