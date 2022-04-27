/* eslint-disable no-console */
const consolewarn = console.warn;
console.warn = (...args) => {
  if (
    args.length > 1 &&
    args[1].startsWith(
      "You should not access 'res' after getServerSideProps resolves."
    )
  ) {
    // ignore warning message until this is fixed: https://github.com/auth0/nextjs-auth0/issues/524
  } else {
    consolewarn(...args);
  }
};

module.exports = {
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  },
};
