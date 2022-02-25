import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { Component } from '../../../types/react'

type AppBarProps = {
  children: Component
}

export default function AppBar({ children }: AppBarProps) {
  return (
    <MuiAppBar position={'static'} elevation={0}>
      <MuiToolbar variant={'dense'} disableGutters sx={{ paddingLeft: 1, paddingRight: 1 }}>
        {children}
      </MuiToolbar>
    </MuiAppBar>
  )
}
