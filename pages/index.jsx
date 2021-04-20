/* eslint-disable react/button-has-type */
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from './header';
import styles from './Index.module.css';


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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    // Hard code dwolla master account email for now
    if (user.email === process.env.ADMIN_EMAIL) {
      return (
        <>
          <div>Welcome {user.name}!</div>
          <Redirect to="/admin" />
        </>
      );
    }
    return (
      <>
        <div>Welcome {user.name}!</div>
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
          <button className={styles.button} onClick={() => {
            router.push("/api/auth/login")
          }}>
            <p className={styles.p}>Login or Signup</p>
          </button>
      </div>
    </>
  );
}
