import MuiBox from '@mui/material/Box'
import theme from '../../../styles/theme'

type LoadingProps = {}

export default function Loading({}: LoadingProps) {
  return (
    <MuiBox
      sx={{
        '&, &::before, &::after': {
          background: theme.palette.primary.main,
          animation: 'load1 1s infinite ease-in-out',
          width: '1em',
          height: '4em',
        },
        color: theme.palette.primary.main,
        textIndent: '-9999em',
        margin: '88px auto',
        position: 'relative',
        fontSize: '11px',
        transform: 'translateZ(0)',
        animationDelay: '-0s',
        '&::before, &::after': {
          position: 'absolute',
          top: 0,
          content: '""',
        },
        '&::before': {
          left: '-1.5em',
          animationDelay: '-0.16s',
        },
        '&::after': {
          animationDelay: '0.16s',
          left: '1.5em',
        },
        '@keyframes load1': {
          '0%, 80%, 100%': {
            boxShadow: '0 0',
            height: '4em',
          },
          '40%': {
            boxShadow: '0 -2em',
            height: '5em',
          },
        },
      }}
    >
      Loading...
    </MuiBox>
  )
}
