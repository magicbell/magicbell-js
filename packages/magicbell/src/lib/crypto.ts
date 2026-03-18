const getRandomValues =
  typeof crypto !== 'undefined' && crypto.getRandomValues
    ? () => crypto.getRandomValues(new Uint32Array(1))[0]!.toString(36)
    : () => Math.random().toString(36).substring(2, 15);

export function generateID(length = 17) {
  let id = '';

  while (id.length < length) {
    id += getRandomValues();
  }

  return id.substring(0, length);
}
