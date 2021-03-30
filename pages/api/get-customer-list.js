import { getSession } from "@auth0/nextjs-auth0";
import { getCustomerFundingSource } from "../../app/dwolla";

export default async function (req, res) {
  const s = await getSession(req, res);
  if (!s) return res.status(401).json({ error: "unauthorized" });
  const customerFundingSource = await getCustomers();
  res.status(200).json({ customerFundingSource });
}
