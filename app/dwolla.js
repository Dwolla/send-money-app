import { Client } from 'dwolla-v2';

const customerUrl = ''; // Set CustomerUrl here

const dwolla = new Client({
  key: process.env.DWOLLA_APP_KEY,
  secret: process.env.DWOLLA_APP_SECRET,
  environment: process.env.DWOLLA_APP_ENV,
});

const getRoot = async () => {
  const res = await dwolla.get('/');
  return res.body._links.account.href;
};

const getAccountDetails = async () => {
  const accountUrl = await getRoot();

  const res = await dwolla.get(accountUrl);
  return res.body;
};

const getAccountFundingSources = async () => {
  const accountUrl = await getRoot();

  const res = await dwolla.get(`${accountUrl}/funding-sources`, {
    removed: false,
  });
  return res.body;
};

const getCustomers = async () => {
  const res = await dwolla.get('customers');
  return res.body;
};

const getCustomerDetails = async () => {
  const res = await dwolla.get(customerUrl);
  return res.body;
};

const getCustomerFundingSources = async () => {
  const res = await dwolla.get(`${customerUrl}/funding-sources`, {
    removed: false,
  });
  return res.body;
};

const getCustomerTransfers = async () => {
  const res = await dwolla.get(`${customerUrl}/transfers`);
  return res.body;
};

const removeBank = async (id) => {
  const fundingSourceUrl = `https://api-sandbox.dwolla.com/funding-sources/${id}`; // Accepting {id} as props to remove a funding-source
  const requestBody = {
    removed: true,
  };
  const res = await dwolla.post(fundingSourceUrl, requestBody);
  return res;
};

const createFundingSourcesToken = async () => {
  const res = await dwolla.post(`${customerUrl}/funding-sources-token`);
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
