import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

import styles from './_app.module.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
