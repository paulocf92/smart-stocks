import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
