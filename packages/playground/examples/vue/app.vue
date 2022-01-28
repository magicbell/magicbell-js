<template>
  <div ref="notifications">Notifications</div>
</template>

<script>
import { renderWidget } from '@magicbell/embeddable/dist/magicbell.esm.js';

export default {
  name: 'NotificationComponent',
  mounted: function () {
    const options = {
      apiKey: '__MAGICBELL_API_KEY__',
      userEmail: '__MAGICBELL_USER_EMAIL__',
      userKey: '__MAGICBELL_USER_KEY__',
    };

    renderWidget(this.$refs.notifications, options);
  },
};
</script>
