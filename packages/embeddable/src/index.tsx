import React from 'react';
import ReactDOM from 'react-dom';
import Widget, { WidgetProps } from './components/Widget';

function validateIsFn(fn, message) {
  if (fn && typeof fn !== 'function') throw message;
}

function validateParams(options) {
  const { target, onNotificationClick, onNotificationCreated } = options;
  validateIsFn(onNotificationClick, '"onNotificationClick" must be a function');
  validateIsFn(onNotificationCreated, '"onNotificationCreated" must be a function');

  if (!target?.nodeType) throw '"target" must be an HTML element';
}

/**
 * Function that renders the widget if all options are valid.
 *
 * @example
 * renderWidget({ userEmail, apiKey, target: document.getElementById('test') })
 */
export function renderWidget(target: HTMLElement, options: WidgetProps) {
  validateParams({ target, ...options });
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
