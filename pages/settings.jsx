/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import AddBank from '../app/components/AddBank';
import BankDetails from '../app/components/BankDetails';
import CustomerInformation from '../app/components/Customer/CustomerInformation';
import CustomerLayout from '../app/components/Customer/CustomerLayout';
import fetcher from '../app/fetcher';

const spacingStyle = {
  margin: '30px 0',
};

export default function CustomerSettings() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [fundingSource, setFundingSource] = useState();

  useEffect(() => {
    if (localStorage.getItem('userEmail') === process.env.ADMIN_EMAIL) {
      router.push('/');
      return;
    }
    setLoaded(true);
    setCustomerId(localStorage.getItem('userDwollaId'));
  }, []);

  const { data, error } = useSWR(
    customerId ? `/api/customer-funding-sources/${customerId}` : null,
    fetcher
  );

  if (!loaded) {
    return <p>Redirecting...</p>;
  }

  if (error) return <p>There was an error.</p>;

  return (
    <CustomerLayout>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        <CustomerInformation customerId={customerId} />
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {!data ? (
          <p>Loading...</p>
        ) : !fundingSource ? (
          <div style={spacingStyle}>
            <AddBank
              customerId={customerId}
              setFundingSource={setFundingSource}
            />
          </div>
        ) : (
          data.customerFundingSources._embedded['funding-sources'].length !==
            0 && (
            <BankDetails
              {...data.customerFundingSources._embedded['funding-sources'][0]}
              setFundingSource={setFundingSource}
            />
          )
        )}
      </div>
    </CustomerLayout>
  );
}

export const getServerSideProps = withPageAuthRequired();
