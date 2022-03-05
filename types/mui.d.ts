import '@mui/material/styles/createPalette'
import '@mui/material/Button'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    google: Palette['primary']
    github: Palette['primary']
    white: Palette['primary']
    black: Palette['primary']
  }
  interface PaletteOptions {
    google: PaletteOptions['primary']
    github: PaletteOptions['primary']
    white: PaletteOptions['primary']
    black: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    google: true
    github: true
    white: true
    black: true
  }
}

declare module '@mui/material/IconButton' {
  export interface IconButtonPropsColorOverrides {
    white: true
    black: true
  }
}

declare module '@mui/material/LinearProgress' {
  export interface LinearProgressPropsColorOverrides {
    white: true
    black: true
  }
}

export type Color = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white' | 'black'
export type ServiceColor = 'google' | 'github'
