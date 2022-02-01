import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#B39DDB',
      main: '#5E35B1',
      dark: '#311B92',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFCC80',
      main: '#FB8C00',
      dark: '#E65100',
      contrastText: '#000',
    },
    error: {
      light: '#EF9A9A',
      main: '#E53935',
      dark: '#B71C1C',
      contrastText: '#000',
    },
    warning: {
      light: '#FFF59D',
      main: '#FDD835',
      dark: '#F57F17',
      contrastText: '#000',
    },
    info: {
      light: '#90CAF9',
      main: '#1E88E5',
      dark: '#0D47A1',
      contrastText: '#000',
    },
    success: {
      light: '#A5D6A7',
      main: '#43A047',
      dark: '#1B5E20',
      contrastText: '#000',
    },
    google: {
      main: '#4285F4',
      contrastText: '#fff',
    },
    github: {
      main: '#333',
      contrastText: '#fff',
    },
  },
})

export default theme
