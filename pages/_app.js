import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//cdn.dwolla.com/v2/dwolla-web.js"
        ></script>
      </Head>

      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
