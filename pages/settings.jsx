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
  const { data, error } = useSWR('/api/get-customer-funding-sources', fetcher);

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
