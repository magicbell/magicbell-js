import React from 'react';
import ReactDOM from 'react-dom';

import Widget, { WidgetProps } from './components/Widget/Widget.js';
import emitter, { MagicBellEventEmitter } from './lib/emitter.js';

function validateIsFn(fn, message) {
  if (fn && typeof fn !== 'function') throw message;
}

function validateParams(options) {
  const { target, onNotificationClick, onNewNotification } = options;
  validateIsFn(onNotificationClick, '"onNotificationClick" must be a function');
  validateIsFn(onNewNotification, '"onNewNotification" must be a function');

  if (!target?.nodeType) throw '"target" must be a valid HTML element';
}

/**
 * This maintains a list of active MagicBell widgets on the page. This is
 * primarily used as a way to enable us to cleanup all the active widgets on
 * the page.
 * NOTE: The approach of maintaining active widgets internally like this was
 * done to maintain backwards compatability with renderWidget.
 */
const activeWidgets: HTMLElement[] = [];

/**
 * Function that renders a MagicBell widget if all options are valid.
 *
 * @example
 * renderWidget(document.getElementById('mbWidget'), { userEmail, apiKey })
 */
export function renderWidget(target: HTMLElement, options: WidgetProps): MagicBellEventEmitter {
  validateParams({ target, ...options });
  ReactDOM.render(<Widget {...options} />, target);
  activeWidgets.push(target);
  return emitter;
}

/**
 * Function that cleans up the one or more MagicBell widgets
 * @param target The targetElement containing the magicbell widget to clean up.
 * @example
 * cleanup(document.getElementById('mbWidget')) // cleans up test widget
 */
export function cleanup(targetElement: HTMLElement) {
  // NOTE: Don't need to remove this targetElement from the activeWidgets as
  // calling unmountComponentAtNode is apparently idempotent.
  ReactDOM.unmountComponentAtNode(targetElement);
}

/**
 * Function that cleans up all MagicBell widgets
 * @example
 * cleanup() // cleans up all MagicBell widgets on the page
 */
export function cleanupAll() {
  let activeTarget = activeWidgets.pop();
  while (undefined !== activeTarget) {
    ReactDOM.unmountComponentAtNode(activeTarget);
    activeTarget = activeWidgets.pop();
  }
}

/**
 * Function called when this module is imported. Iterates over
 * all items in the MagicBellObject's queue.
 *
 * Available queue actions:
 * * render - The `render` action renders the MagicBell widget with the provided
 * options. NOTE: Currently the only supported action.
 */
function dequeue(window) {
  const { q: queue } = window[window['MagicBellObject']] || {};

  if (queue) {
    queue.forEach((element) => {
      const [method, target, options] = Array.from(element) as [string, HTMLElement, WidgetProps];

      if (method.toLowerCase().trim() === 'render') {
        renderWidget(target, options);
      }
    });
  }
}

dequeue(window);

// For the use case where someone takes advantage of our MagcBell queue (see
// dequeu above), we will automatically cleanup on a reload.
window.addEventListener('beforeunload', () => {
  cleanupAll();
});
