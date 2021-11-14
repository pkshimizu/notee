import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from "../components/systems/Style";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Style>
      <Component {...pageProps} />
    </Style>
  )
}

export default MyApp
