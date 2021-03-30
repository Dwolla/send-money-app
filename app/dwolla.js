import { Client } from "dwolla-v2";

const dwolla = new Client({
  key: process.env.DWOLLA_APP_KEY,
  secret: process.env.DWOLLA_APP_SECRET,
  environment: process.env.DWOLLA_APP_ENVIRONMENT,
});

const getRoot = async () => {
  const res = await dwolla.get("/");
  return res.body._links.account.href;
};

const getAccountDetails = async () => {
  var accountUrl = await getRoot();

  const res = await dwolla.get(accountUrl);
  return res.body;
};

const getAccountFundingSources = async () => {
  var accountUrl = await getRoot();

  const res = await dwolla.get(`${accountUrl}/funding-sources`);
  return res.body;
};

const getCustomers = async () => {
  const res = await dwolla.get("customers");
  return res.body;
};

const getCustomerDetails = async () => {
  var customerUrl = "http://api-sandbox.dwolla.com/customers/{id}"; // temporary static data. This will need to be set based on the user logged in to a session
  const res = await dwolla.get(customerUrl);
  return res.body;
};

const getCustomerFundingSources = async () => {
  var customerUrl = "http://api-sandbox.dwolla.com/customers/{id}"; // temporary static data. This will need to be set based on the user logged in to a session

  const res = await dwolla.get(`${customerUrl}/funding-sources`);
  return res.body;
};

const getCustomerTransfers = async () => {
  var customerUrl = "http://api-sandbox.dwolla.com/customers/{id}"; // temporary static data. This will need to be set based on the user logged in to a session
  const res = await dwolla.get(`${customerUrl}/transfers`);
  return res.body;
};

export default dwolla;
export {
  getAccountDetails,
  getAccountFundingSources,
  getCustomers,
  getCustomerTransfers,
  getCustomerDetails,
  getCustomerFundingSources,
};
