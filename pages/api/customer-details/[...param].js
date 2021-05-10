import { getSession } from '@auth0/nextjs-auth0';
import { getCustomerDetails } from '../../../app/dwolla';

export default async function (req, res) {
  const s = await getSession(req, res);
  if (!s) return res.status(401).json({ error: 'unauthorized' });
  const { param } = req.query;
  const customerDetails = await getCustomerDetails(param);
  return res.status(200).json({ email: s.user.email, customerDetails });
}
