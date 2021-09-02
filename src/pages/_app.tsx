import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store } from '../store/store';

import '../styles/global.scss';
import '../styles/rechartsTooltip.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
