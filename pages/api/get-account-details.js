import { getSession } from "@auth0/nextjs-auth0";
import { getAccountDetails } from "../../app/dwolla";

export default async function (req, res) {
  const s = await getSession(req, res);
  if (!s) return res.status(401).json({ error: "unauthorized" });
  const accountDetails = await getAccountDetails();
  console.log(accountDetails);
  res.status(200).json({ email: s.user.email, accountDetails });
}
