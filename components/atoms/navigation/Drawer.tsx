import { ReactNode, useCallback } from 'react'
import MuiDrawer from '@mui/material/Drawer'

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

type DrawerProps = {
  anchor?: DrawerAnchor
  open: boolean
  children: ReactNode
  onClose?: () => void
}

export default function Drawer({ anchor = 'left', open, children, onClose }: DrawerProps) {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <MuiDrawer anchor={anchor} open={open} variant={'permanent'} onClose={handleClose}>
      {children}
    </MuiDrawer>
  )
}
