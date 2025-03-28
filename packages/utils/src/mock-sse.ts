import { setTimeout } from 'node:timers/promises';

import { http, HttpResponse } from 'msw';

async function createStream(
  controller: ReadableStreamController<any>,
  generator: () => Generator<Record<string, unknown>>,
) {
  const iterator = generator();
  const encoder = new TextEncoder();
  const e = encoder.encode.bind(encoder);

  controller.enqueue(e(`retry: 10000\n\n`));

  for (let result = iterator.next(); !result.done; result = iterator.next()) {
    const data = JSON.stringify(result.value);
    controller.enqueue(e(`event: message\ndata: ${data}\n\n`));
    await setTimeout(5);
  }

  controller.enqueue(e(`event: message\ndata: { "type": "close" }\n\n`));
  await setTimeout(5);
  controller.close();
}

export function eventStream(url: string, generatorFn: () => Generator<Record<string, unknown>, void, unknown>) {
  return http.get(url, () => {
    const stream = new ReadableStream({
      start(controller) {
        void createStream(controller, generatorFn);
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  });
}
