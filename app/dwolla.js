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

  const res = await dwolla.get(`${accountUrl}/funding-sources`, {
    removed: false,
  });
  return res.body;
};

const getCustomers = async () => {
  const res = await dwolla.get("customers");
  return res.body;
};

const getCustomerDetails = async (id) => {
  var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; // temporary static data. This will need to be set based on the user logged in to a session
  const res = await dwolla.get(customerUrl);
  return res.body;
};

const getCustomerFundingSources = async (id) => {
  var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; // temporary static data. This will need to be set based on the user logged in to a session

  const res = await dwolla.get(`${customerUrl}/funding-sources`, {
    removed: false,
  });
  return res.body;
};

const getCustomerTransfers = async (id) => {
  var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; // temporary static data. This will need to be set based on the user logged in to a session
  const res = await dwolla.get(`${customerUrl}/transfers`);
  return res.body;
};

const removeBank = async (id) => {
  var fundingSourceUrl = `https://api-sandbox.dwolla.com/funding-sources/${id}`;
  var requestBody = {
    removed: true,
  };
  const res = await dwolla.post(fundingSourceUrl, requestBody);
};

export default dwolla;
export {
  getAccountDetails,
  getAccountFundingSources,
  getCustomers,
  getCustomerTransfers,
  getCustomerDetails,
  getCustomerFundingSources,
  removeBank,
};
