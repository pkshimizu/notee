import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}

const clientSideEmotionCache = createEmotionCache()

const theme = createTheme({
  palette: {
    primary: {
      light: '#DEDFEF',
      main: '#A4A9CF',
      dark: '#7379AE',
      contrastText: '#fff',
    },
    secondary: {
      light: '#EDD0E5',
      main: '#C97FB4',
      dark: '#A53F88',
    },
    error: {
      light: '#F6D4D8',
      main: '#E38692',
      dark: '#D04255',
    },
    warning: {
      light: '#FEF7D5',
      main: '#FBE481',
      dark: '#F8D32F',
    },
    info: {
      light: '#CBE6F3',
      main: '#6EB7DB',
      dark: '#208DC3',
    },
    success: {
      light: '#D1F1CC',
      main: '#81D674',
      dark: '#3EBA2B',
    },
  },
})

type StyleProps = {
  cache?: EmotionCache
  children: ReactNode
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
