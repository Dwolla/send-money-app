// eslint-disable-next-line no-undef
dwolla.configure({
  environment: 'sandbox',
  styles: '/styles/update-custom.css',
  tokenUrl: () => Promise.resolve('/token-endpoint'),
  success: (res) => Promise.resolve(res),
  error: (err) => Promise.resolve(err),
});
