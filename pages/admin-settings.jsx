/* eslint-disable no-undef */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import AccountInformation from '../app/components/Admin/AccountInformation';
import BankDetails from '../app/components/BankDetails';
import AdminLayout from '../app/components/Admin/AdminLayout';
import fetcher from '../app/fetcher';

const spacingStyle = {
  margin: '30px 0',
};

export default function AdminSettings() {
  const { data, error } = useSWR('/api/account-funding-sources', fetcher);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('userEmail') !== process.env.ADMIN_EMAIL) {
      router.push('/');
      return;
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Redirecting...</p>;
  }

  if (error) return <p>There was an error.</p>;

  return (
    <AdminLayout>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
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
    </AdminLayout>
  );
}

export const getServerSideProps = withPageAuthRequired();
