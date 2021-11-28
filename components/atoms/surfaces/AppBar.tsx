import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { ReactNode } from 'react'

type AppBarProps = {
  children: ReactNode
}

export default function AppBar({ children }: AppBarProps) {
  return (
    <MuiAppBar position={'static'}>
      <MuiToolbar>{children}</MuiToolbar>
    </MuiAppBar>
  )
}
