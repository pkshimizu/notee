import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Style from '../components/systems/Style';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Style>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Style>
  );
}

export default MyApp;
