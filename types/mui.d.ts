import '@mui/material/styles/createPalette'
import '@mui/material/Button'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    google: Palette['primary']
    github: Palette['primary']
  }
  interface PaletteOptions {
    google: PaletteOptions['primary']
    github: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    google: true
    github: true
  }
}
