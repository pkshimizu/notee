import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../../styles/theme'
import { Component } from '../../types/react'

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}

const clientSideEmotionCache = createEmotionCache()

type StyleProps = {
  cache?: EmotionCache
  children: Component
}

export default function Style({ cache = clientSideEmotionCache, children }: StyleProps) {
  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
