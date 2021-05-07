import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import useSWR from 'swr';
import fetcher from '../app/fetcher';
import { CustomerContext } from '../app/components/context/CustomerContext';

import CustomerLayout from '../app/components/Customer/CustomerLayout';
import TransfersTable from '../app/components/TransfersTable';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function Dashboard() {
  // check if the user has a customr account by filtering Customer list based on email search parameter.
  // if it doesn't, display a form to collect firstName and lastName
  // When they hit submit, we create a Customer account in Dwolla then render the CustomerLayout
  // Save the CustomerID to CustomerContext

  // Remove the following eslint comment after using setCustomerId
  // eslint-disable-next-line no-unused-vars
  const [customerId, setCustomerId] = useContext(CustomerContext);
  const { user, error, isLoading } = useUser();
  const { data } = useSWR(`/api/customer-transfer/${customerId}`, fetcher);

  if (!user || user.email === process.env.ADMIN_EMAIL) {
    return <Redirect to="/" />;
  }

  return (
    <CustomerLayout>
      <h3>PAYMENT HISTORY</h3>
      {isLoading && <p>Loading profile...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && data && (
        <>
          <TransfersTable transfers={data.transfers._embedded.transfers} />
        </>
      )}
    </CustomerLayout>
  );
}
