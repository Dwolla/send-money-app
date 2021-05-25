/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import fetcher from '../app/fetcher';
import Header from '../app/components/header';
import styles from '../styles/Index.module.css';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function Index() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const checkCustomerEmail = useSWR(
    `/api/customer-list/${encodeURIComponent('shreyath577665522@gmail.com')}`,
    fetcher
  ).data;

  useEffect(() => {
    if (checkCustomerEmail !== undefined) {
      if (checkCustomerEmail && checkCustomerEmail.customers.total !== 0) {
        localStorage.setItem(
          'userDwollaId',
          checkCustomerEmail.customers._embedded.customers[0].id
        );
      }
    }
  }, [checkCustomerEmail]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    if (user.email === process.env.ADMIN_EMAIL) {
      return (
        <>
          <Redirect to="/admin" />
        </>
      );
    }

    return (
      <>
        <Redirect to="/dashboard" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Send Money Starter Kit</title>
        <script
          type="text/javascript"
          src="https://cdn.dwolla.com/v2/dwolla-web.js"
        />
      </Head>
      <Header />
      <div className={styles.landingBlock}>
        <Image
          src="/corgiLanding.jpg"
          alt="dogs on leashes"
          width={700}
          height={900}
          objectFit="fill"
        />
        <button
          className={styles.button}
          onClick={() => {
            router.push('/api/auth/login');
          }}
        >
          <p className={styles.p}>Login or Signup</p>
        </button>
      </div>
    </>
  );
}
