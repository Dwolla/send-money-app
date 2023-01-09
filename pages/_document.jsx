import { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';

function Document() {
  return (
    <Html>
      <Head>
        <Link href="https://fonts.gstatic.com" rel="preconnect" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Blinker:wght@300&display=swap"
          rel="stylesheet"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
