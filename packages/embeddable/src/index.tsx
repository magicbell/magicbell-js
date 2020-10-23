import React from 'react';
import ReactDOM from 'react-dom';
import Widget, { WidgetProps } from './components/Widget';

/**
 * Function that renders the widget if all options are valid.
 *
 * @example
 * renderWidget({ userEmail, apiKey, target: document.getElementById('test') })
 */
export function renderWidget(target: HTMLElement, options: WidgetProps) {
  const { onNotificationClick } = options;
  if (onNotificationClick && typeof onNotificationClick !== 'function')
    throw '"onNotificationClick" must be a function';
  if (!target?.nodeType) throw '"target" must be an HTML element';

  ReactDOM.render(<Widget {...options} />, target);
}

/**
 * Function called when this module is imported. Iterates over
 * all items in the MagicBellObject's queue, if it exists.
 *
 * The `render` action renders the MagicBell widget with the provided
 * options. This is the only supported action.
 */
function dequeue(window) {
  let globalObject = window[window['MagicBellObject']];
  const { q: queue } = globalObject || {};

  if (queue) {
    queue.forEach((element) => {
      const [method, ...options] = Array.from(element);

      if (method.toLowerCase().trim() === 'render') {
        globalObject = renderWidget(options[0], options[1]);
      }
    });
  }
}

dequeue(window);
