import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#DEDFEF',
      main: '#8000FF',
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

export default theme
