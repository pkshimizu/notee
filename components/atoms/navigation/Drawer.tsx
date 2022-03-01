import { useCallback } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { Component } from '../../../types/react'
import { useSwipeable } from 'react-swipeable'

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

type DrawerProps = {
  anchor?: DrawerAnchor
  open: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
  children: Component
  onClose?: () => void
}

function isCloseSwipe(anchor: DrawerAnchor, event: string) {
  switch (anchor) {
  case 'left':
    return event === 'Left'
  case 'right':
    return event === 'Right'
  case 'top':
    return event === 'Up'
  case 'bottom':
    return event === 'Down'
  default:
    return false
  }
}

export default function Drawer({ anchor = 'left', open, variant, children, onClose }: DrawerProps) {
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (onClose && isCloseSwipe(anchor, eventData.dir)) {
        onClose()
      }
    },
  })
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <MuiDrawer anchor={anchor} open={open} variant={variant} onClose={handleClose} {...handlers}>
      {children}
    </MuiDrawer>
  )
}
