import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import AccountInformation from '../app/components/Admin/AccountInformation';
import BankDetails from '../app/components/BankDetails';
import AdminLayout from '../app/components/Admin/AdminLayout';
import fetcher from '../app/fetcher';

const spacingStyle = {
  margin: '30px 0',
};

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function AdminSettings() {
  const { user, isLoading } = useUser();
  const { data, error } = useSWR('/api/account-funding-sources', fetcher);

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return (
      <>
        {isLoading && null}
        <Redirect to="/" />
      </>
    );
  }

  if (error) return <p>There was an error.</p>;

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        {isLoading && <p>Loading info...</p>}
        <AccountInformation />
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {!data ? (
          <p>Loading</p>
        ) : data.accountFundingSources._embedded['funding-sources'].length !==
          0 ? (
          <BankDetails
            {...data.accountFundingSources._embedded['funding-sources'][0]}
          />
        ) : (
          <div style={spacingStyle}>
            <p>You don't have a verified bank account attached.</p>
            <p> Add a new verified Bank via the API.</p>
          </div>
        )}
      </div>
    </>
  );
}

AdminSettings.Layout = AdminLayout;
