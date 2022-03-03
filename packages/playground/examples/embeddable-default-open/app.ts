import { renderWidget } from '@magicbell/embeddable';

const options = {
  apiKey: '__MAGICBELL_API_KEY__',
  userEmail: '__MAGICBELL_USER_EMAIL__',
  userKey: '__MAGICBELL_USER_KEY__',
  height: 500,
  defaultIsOpen: true,
};

renderWidget(document.getElementById('app'), options);

// or when using the MagicBell CDN (copy from our Embed page):
// magicbell('render', document.getElementById('app'), options);
