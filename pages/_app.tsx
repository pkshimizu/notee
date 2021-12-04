import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth, { AuthContext } from '../components/systems/Auth'
import RepositoryProvider from '../components/systems/RepositoryProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RepositoryProvider>
      <Style>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Style>
    </RepositoryProvider>
  )
}
