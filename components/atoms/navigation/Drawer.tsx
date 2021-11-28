import { ReactNode } from 'react'
import MuiDrawer from '@mui/material/Drawer'

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

type DrawerProps = {
  anchor?: DrawerAnchor
  open: boolean
  children: ReactNode
  onClose: () => void
}

export default function Drawer({ anchor = 'left', open, children, onClose }: DrawerProps) {
  return (
    <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
      {children}
    </MuiDrawer>
  )
}
