import { renderWidget } from '@magicbell/embeddable';

const options = {
  apiKey: '__MAGICBELL_API_KEY__',
  userEmail: '__MAGICBELL_USER_EMAIL__',
  userKey: '__MAGICBELL_USER_KEY__',
  height: 500,
};

renderWidget(document.getElementById('app'), options);
