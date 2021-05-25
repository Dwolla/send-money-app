import { useContext } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import AddBank from '../app/components/AddBank';
import BankDetails from '../app/components/BankDetails';
import CustomerInformation from '../app/components/Customer/CustomerInformation';
import CustomerLayout from '../app/components/Customer/CustomerLayout';
import fetcher from '../app/fetcher';
import { CustomerContext } from '../app/components/context/CustomerContext';

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
  const [customerId] = useContext(CustomerContext);
  const { data, error } = useSWR(
    `/api/customer-funding-sources/${customerId}`,
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
        <CustomerInformation />
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {!data ? (
          <p>Loading</p>
        ) : data.customerFundingSources._embedded['funding-sources'].length !==
          0 ? (
          <BankDetails
            {...data.customerFundingSources._embedded['funding-sources'][0]}
          />
        ) : (
          <div style={spacingStyle}>
            <AddBank />
          </div>
        )}
      </div>
    </>
  );
}

CustomerSettings.Layout = CustomerLayout;
