import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth from '../components/systems/Auth'
import RouterProvider from '../components/systems/RouterProvider'
import Store from '../components/systems/Store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <RouterProvider>
        <Style>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Style>
      </RouterProvider>
    </Store>
  )
}
