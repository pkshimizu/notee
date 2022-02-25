import MuiMenu from '@mui/material/Menu'
import { Component } from '../../../types/react'

type MenuProps = {
  target?: Element
  children: Component
  onClose: () => void
}

export default function Menu({ target, children, onClose }: MenuProps) {
  return (
    <MuiMenu anchorEl={target} open={target !== undefined} onClose={onClose}>
      {children}
    </MuiMenu>
  )
}
