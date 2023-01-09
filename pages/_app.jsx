/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import createEmotionCache from '../app/createEmotionCache';
import theme from '../app/theme';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
