import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth, { AuthContext } from '../components/systems/Auth'
import RepositoryProvider from '../components/systems/RepositoryProvider'
import RouterProvider from '../components/systems/RouterProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RepositoryProvider>
      <RouterProvider>
        <Style>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Style>
      </RouterProvider>
    </RepositoryProvider>
  )
}
