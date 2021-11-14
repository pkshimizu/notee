import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ReactNode} from "react";

const cache = createCache({
  key: "css",
  prepend: true
})

const theme = createTheme({
})

type StyleProps = {
  children: ReactNode
}

export default function Style({children}: StyleProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
