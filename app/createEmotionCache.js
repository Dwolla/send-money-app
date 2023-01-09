import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

const createEmotionCache = () => {
  const insertionPoint =
    (isBrowser &&
      document.querySelector("meta[name='emotion-insertion-point']")) ||
    undefined;
  return createCache({ key: 'mui-style', insertionPoint });
};

export default createEmotionCache;
