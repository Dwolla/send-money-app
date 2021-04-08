import { useUser } from "@auth0/nextjs-auth0";
import styles from "./Index.module.css";
import Head from "next/head";
import Image from "next/image";
import Header from "./header.js";
import Link from "next/link";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    // Hard code dwolla master account email for now
    if (user.email === process.env.ADMIN_EMAIL) {
      return (
        <>
          <div>Welcome {user.name}!</div>
          <div>
            <a href="/admin">View profile</a>
          </div>
          <div>
            <a href="/api/auth/logout">Logout</a>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>Welcome {user.name}!</div>
          <div>
            <a href="/dashboard">View profile</a>
          </div>
          <div>
            <a href="/api/auth/logout">Logout</a>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Dwolla Starter Kit</title>
        <script
          type="text/javascript"
          src="https://cdn.dwolla.com/v2/dwolla-web.js"
        ></script>
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
        <Link href="/api/auth/login" className={styles.link}>
          <button className={styles.button}>
            <a className={styles.a}>Login | Signup</a>
          </button>
        </Link>
      </div>
    </>
  );
}
