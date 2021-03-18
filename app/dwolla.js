import { Client } from "dwolla-v2";

const dwolla = new Client({
  key: process.env.DWOLLA_APP_KEY,
  secret: process.env.DWOLLA_APP_SECRET,
  environment: process.env.DWOLLA_APP_ENVIRONMENT,
});

const getCustomers = async () => {
  const res = await dwolla.get("customers");
  return res.body;
};

export default dwolla;
