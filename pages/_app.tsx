import '../styles/globals.css'
import type { AppProps as NextAppProps } from 'next/app'
import Style from '../components/systems/Style'
import Auth from '../components/systems/Auth'
import Store from '../components/systems/Store'
import DataProvider from '../components/systems/DataProvider'
import { EmotionCache } from '@emotion/react'
import System from '../components/systems/System'
import DialogProvider from '../components/systems/DialogProvider'
import { ComponentType } from 'react'

type AppProps = {
  Component: NextAppProps['Component'] & {
    layout?: ComponentType
  }
  emotionCache?: EmotionCache
} & NextAppProps

export default function App({ emotionCache, Component, pageProps }: AppProps) {
  return (
    <Store>
      <Style cache={emotionCache}>
        <System>
          <Auth>
            <DataProvider>
              {Component.layout ? (
                <Component.layout>
                  <Component {...pageProps} />
                </Component.layout>
              ) : (
                <Component {...pageProps} />
              )}
              <DialogProvider />
            </DataProvider>
          </Auth>
        </System>
      </Style>
    </Store>
  )
}
