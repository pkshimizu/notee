import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth from '../components/systems/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Style>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Style>
  )
}

export default MyApp
