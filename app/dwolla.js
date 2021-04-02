import { Client } from "dwolla-v2";
// Set CustomerUrl here
// const customerUrl = "";

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

const getCustomerDetails = async () => {
  // var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; We can set the CustomerURL based on the id passed in as props or use the global customerUrl defined at the top

  const res = await dwolla.get(customerUrl);
  return res.body;
};

const getCustomerFundingSources = async () => {
  // var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; We can set the CustomerURL based on the id passed in as props or use the global customerUrl defined at the top

  const res = await dwolla.get(`${customerUrl}/funding-sources`, {
    removed: false,
  });
  return res.body;
};

const getCustomerTransfers = async () => {
  // var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; We can set the CustomerURL based on the id passed in as props or use the global customerUrl defined at the top
  const res = await dwolla.get(`${customerUrl}/transfers`);
  return res.body;
};

const removeBank = async (id) => {
  var fundingSourceUrl = `https://api-sandbox.dwolla.com/funding-sources/${id}`; // Accepting {id} as props to remove a funding-source
  var requestBody = {
    removed: true,
  };
  const res = await dwolla.post(fundingSourceUrl, requestBody);
};

const createFundingSourcesToken = async () => {
  // var customerUrl = `http://api-sandbox.dwolla.com/customers/${id}`; We can set the CustomerURL based on the id passed in as props or use the global customerUrl defined at the top
  var res = await dwolla.post(`${customerUrl}/funding-sources-token`);
  return res.body.token;
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
  createFundingSourcesToken,
};
