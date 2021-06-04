/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import AddBank from '../app/components/AddBank';
import BankDetails from '../app/components/BankDetails';
import CustomerInformation from '../app/components/Customer/CustomerInformation';
import CustomerLayout from '../app/components/Customer/CustomerLayout';
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

export default function CustomerSettings() {
  const { user, isLoading } = useUser();
  const [customerId, setCustomerId] = useState();
  const [fundingSource, setFundingSource] = useState();

  useEffect(() => {
    setCustomerId(localStorage.getItem('userDwollaId'));
  }, []);

  const { data, error } = useSWR(
    customerId ? `/api/customer-funding-sources/${customerId}` : null,
    fetcher
  );

  if (!user || user.email === process.env.ADMIN_EMAIL) {
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
    </>
  );
}

CustomerSettings.Layout = CustomerLayout;

export const getServerSideProps = withPageAuthRequired();
