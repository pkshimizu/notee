import MuiMenu from '@mui/material/Menu'
import { ReactNode } from 'react'

type MenuProps = {
  target?: Element
  children: ReactNode
  onClose: () => void
}

export default function Menu({ target, children, onClose }: MenuProps) {
  return (
    <MuiMenu anchorEl={target} open={target !== undefined} onClose={onClose}>
      {children}
    </MuiMenu>
  )
}
