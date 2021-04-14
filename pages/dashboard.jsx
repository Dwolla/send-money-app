import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../app/fetcher';

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
  const { user, error, isLoading } = useUser();
  const { data } = useSWR('/api/customer-transfers', fetcher);

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
