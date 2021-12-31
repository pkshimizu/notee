import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth from '../components/systems/Auth'
import Store from '../components/systems/Store'
import DataProvider from '../components/systems/DataProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Style>
        <Auth>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </Auth>
      </Style>
    </Store>
  )
}
