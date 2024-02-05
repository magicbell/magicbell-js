import { Server } from 'miragejs';
import NotificationFactory from '../../packages/react/tests/factories/NotificationFactory';
import { sampleNotificationPreferences } from "../../packages/react/tests/factories/NotificationPreferencesFactory";

// TODO: move /server to packages/mock-server

const richTextMessages = [
  { title: 'Getting started with MagicBell',
    content: `
        <p>
          <span aria-label="waving emoji" class="emoji" style="margin-right: 0.5rem;">👋</span>
          Hey There!
        </p>
        <p>
          Please take a look at our docs to get started with MagicBell. You can also send test notifications using ‘Compose’, or using the code snippets shared on this page.
        </p>
        <p style="text-align: center; margin-top: 2.5em;">
          <a class="button" style="border-radius: 0.5rem; display: inline-block; background-color: #FDE047; padding: 0.75rem 2rem; border: none;">BROWSE THE DOCS</a>
        </p>`
  },
  { content: `<h3>Hi!</h3><p>It seems this works, right? Nicely formatted text? The title is a bit large, but it's a title after all.</p>` },
  { content: `<p>It's also possible to be a bit more subtle, and just use <b>bold text</b>, or <u>underline words</u>.</p>` },
  { content: `<p>And you can even use <a href="https://magicbell.com" target="_blank">links</a>, <button onclick="javascript:alert('click');">buttons</button>, and <a class="button">button links</a></p>` },
  { content: `<p>Or <code>inline code</code> and code blocks</p><pre><code>const foo = 'bar';</code></pre>` },
  { content: `<p>And paragraphs with lists</p>
   <ul><li>one</li><li>two</li><li>three</li></ul>
   <p>Both unordered and ordered</p>
   <ol><li>one</li><li>two</li><li>three</li></ol>
  ` },
]

// https://www.magicbell.com/docs/rest-api/reference#fetch-notifications
function buildNotifications({ page, read, seen, archived }) {
  page = Number(page) || 1;
  read = !read ? undefined : read === 'true';
  seen = !seen ? undefined : seen === 'true';
  archived = !archived ? undefined : archived === 'true';

  const isFirstPage = page === 1;

  const notifications = NotificationFactory.buildList(10, {
    seenAt: new Date().getTime() / 1000,
    readAt: new Date().getTime() / 1000,
  });

  if (isFirstPage && read === undefined) {
    notifications[0].seenAt = null;
    notifications[0].readAt = null;
    notifications[1].readAt = null;

    notifications.forEach((notification, index) =>
      Object.assign(notification, richTextMessages[index])
    );
  }

  if (read !== undefined) {
    notifications.forEach(notification => {
      notification.readAt = read ? new Date().getTime() / 1000 : null;
    });
  }

  if (seen !== undefined) {
    notifications.forEach(notification => {
      notification.seenAt = seen ? new Date().getTime() / 1000 : null;
    });
  }

  if (archived !== undefined) {
    notifications.forEach(notification => {
      notification.archivedAt = archived ? new Date().getTime() / 1000 : null;
    });
  }

  return {
    total: notifications.length,
    total_pages: 1,
    per_page: notifications.length,
    current_page: page,
    notifications,
    unseen_count: isFirstPage ? notifications.filter(x => !x.seenAt).length : 0,
    unread_count: isFirstPage ? notifications.filter(x => !x.readAt).length : 0,
  };
}

const fixtures = {
  config: {
    ws: {
      region: 'eu',
      channel: 'user_05d52b50-9842-4a5c-acef-a1bb361f9e68-project_83',
      auth_url: 'ws/auth',
    },
    inbox: {
      features: {
        notification_preferences: {
          enabled: true,
        },
      },
    },
    channels: {
      web_push: {
        enabled: true,
        config: {
          subscribe_url: 'https://api.magicbell.com',
        },
      },
    },
  }, preferences: {
    notification_preferences: {
      categories: {
        comment: {
          label: "Comment",
          email: false,
          web_push: true,
          mobile_push: true,
        },
        new_message: {
          label: "New message",
          email: false,
          web_push: true,
          mobile_push: false,
        },
        _replies: {
          label: "replies",
          in_app: true,
          web_push: true,
        },
      },
    },
  }
};


function start() {
  const server = new Server({urlPrefix: 'https://api.magicbell.com'});

  // Settings
  server.get('/config', fixtures.config);

  server.get('/notification_preferences', () => ({
    notification_preferences: sampleNotificationPreferences,
  }));

  server.put('/notification_preferences', () => ({
    notification_preferences: sampleNotificationPreferences,
  }));

  // Notifications
  server.get('/notifications', (req, res) => buildNotifications(res.queryParams));
  server.post('/notifications/read', {});
  server.post('/notifications/seen', {});
  server.post('/notifications/*/read', {});
  server.post('/notifications/*/archive', {});
  server.post('/notifications/*/unarchive', {});
  server.delete('/notifications/*', {});

  // Realtime
  server.post('/ws/*', {
    keyName: '0ugvOA.85mHKQ',
    timestamp: Date.now(),
    nonce: 'f55a1d8c22c304dfb59599e8f9dff3fe',
    mac: 'wymLnXnoufQO8pL5dAlXRDgMyXEwLPhru81HtaVk1NM=',
  });

  server.post('https://rest.ably.io:443/*', {});
  server.get('https://realtime.ably.io/sse/*', {});
}

export default {
  start,
}
