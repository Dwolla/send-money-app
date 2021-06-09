/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../app/fetcher';

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
  const [redirectTo, setRedirectTo] = useState();
  const [notAdmin, setNotAdmin] = useState();
  const [userEmail, setUserEmail] = useState();
  const [customerId, setCustomerId] = useState();

  const { data } = useSWR(
    userEmail ? `/api/customer-list/${encodeURIComponent(userEmail)}` : null,
    fetcher
  );

  useEffect(() => {
    if (localStorage.getItem('userEmail') === process.env.ADMIN_EMAIL) {
      setRedirectTo(true);
      return;
    }
    setNotAdmin(true);
    setUserEmail(localStorage.getItem('userEmail'));

    if (data) {
      if (data.customers.total === 0) {
        setCustomerId(0);
      } else {
        localStorage.setItem(
          'userDwollaId',
          data.customers._embedded.customers[0].id
        );
        setCustomerId(localStorage.getItem('userDwollaId'));
      }
    }
  }, [data]);

  if (redirectTo) {
    return <Redirect to="/" />;
  }

  if (!redirectTo && !notAdmin) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!customerId && <p>Loading...</p>}
      {customerId && (
        <CustomerLayout>
          <h3>PAYMENT HISTORY</h3>
          {customerId && <TransfersTable customerId={customerId} />}
        </CustomerLayout>
      )}
      {customerId === 0 && (
        <Layout>
          <CreateCustomer email={userEmail} setCustomerId={setCustomerId} />
        </Layout>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
