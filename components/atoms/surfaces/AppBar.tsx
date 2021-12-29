import MuiAppBar from '@mui/material/AppBar'
import { ReactNode } from 'react'

type AppBarProps = {
  children: ReactNode
}

export default function AppBar({ children }: AppBarProps) {
  return (
    <MuiAppBar position={'static'} elevation={0}>
      {children}
    </MuiAppBar>
  )
}
