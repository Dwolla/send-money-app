/* eslint-disable no-undef */
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import CustomerLayout from '../app/components/Customer/CustomerLayout';
import Layout from '../app/components/Layout';
import CreateCustomer from '../app/components/Customer/CreateCustomer';
import TransfersTable from '../app/components/Customer/TransfersTable';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function Dashboard() {
  const { user, isLoading, error } = useUser();
  const [customerId, setCustomerId] = useState();

  useEffect(() => {
    setCustomerId(localStorage.getItem('userDwollaId'));
  }, []);

  if (user && user.email === process.env.ADMIN_EMAIL) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <>
        <h4>Error</h4>
        <pre>{error.message}</pre>
      </>
    );
  }

  return (
    <>
      {customerId && (
        <CustomerLayout>
          <h3>PAYMENT HISTORY</h3>
          {customerId && <TransfersTable customerId={customerId} />}
        </CustomerLayout>
      )}
      {!customerId && (
        <Layout>
          <CreateCustomer email={user.email} setCustomerId={setCustomerId} />
        </Layout>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
