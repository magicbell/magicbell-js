import { Meta } from '@storybook/react';
import React from 'react';

import ClickableNotification from '../../src/components/ClickableNotification/ClickableNotification';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { merge } from '../../src/lib/merge';

const DEFAULT_NOTIFICATION = {
  id: 1,
  title: 'Lorem ipsum',
  content: '@John the changes in the API were approved',
  actionUrl: 'https://magicbell.io',
  sentAt: 1599900000,
  seenAt: 1599900000,
  readAt: null,
};

const Component = ({ notification, onClick, theme, ...props }) => (
  <MagicBellThemeProvider value={theme}>
    <ClickableNotification notification={notification} onClick={onClick} {...props} />
  </MagicBellThemeProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onClick: {
      action: 'onClick',
      description: 'Callback function, receives the clicked notification as the only argument',
    },
    notification: { description: 'Notification to render' },
  },
};

export default meta;

export const Default = {
  args: {
    notification: DEFAULT_NOTIFICATION,
  },
};

const html = `
  STYLED CONTENT STARTING HERE<br />
  --------------------
  <h1>Heading 1</h1>
  <h2>Heading 1</h2>
  <h3>Heading 1</h3>
  <h4>Heading 1</h4>
  <h5>Heading 1</h5>
  <h6>Heading 1</h6>
  <p>
    paragraph with a couple of words and a<br />
    linebreak
  </p>
  <p>
    followed by a second paragraph with <code>code</code> and
    <a href="#">a link</a>
  </p>

<p><button>submit</button> <button>cancel</button></p>
  <pre><code>which is in turn followed by a code block</code></pre>
  
  <hr />
  <strong>ul:</strong>
  <ul>
    <li><b>strong</b></li>
    <li><i>italics</i></li>
    <li><u>underline</u></li>
  </ul>
  <strong>ol:</strong>
  <ol>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ol>
  <blockquote>Quote</blockquote>
  <blockquote><p>quote in paragraph</p></blockquote>
  <table>
    <thead>
      <tr>
        <th>col1</th>
        <th>col2</th>
        <th>col3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
      </tr>
      <tr>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
      </tr>
    </tbody>
  </table>
  --------------------<br />
  ENDING THERE
`;

export const WithRichText = merge(Default, {
  args: {
    notification: {
      ...DEFAULT_NOTIFICATION,
      content: html,
    },
  },
});

export const WithRichTextAndNoProse = merge(Default, {
  args: {
    notification: {
      ...DEFAULT_NOTIFICATION,
      content: html,
    },
    prose: false,
  },
});

export const WithRelativeTimes = merge(Default, {
  args: {
    notification: {
      id: 1,
      title: 'Lorem ipsum',
      content:
        '@John the changes in the API were approved <time datetime="2021-03-12T05:33:12Z">on March 12</time>',
      actionUrl: 'https://magicbell.io',
      sentAt: 1599900000,
      seenAt: 1599900000,
      readAt: null,
    },
  },
});
