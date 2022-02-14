import MuiMenu from '@mui/material/Menu'
import { ReactElement } from 'react'

type MenuProps = {
  target?: Element
  children: ReactElement | ReactElement[]
  onClose: () => void
}

export default function Menu({ target, children, onClose }: MenuProps) {
  return (
    <MuiMenu anchorEl={target} open={target !== undefined} onClose={onClose}>
      {children}
    </MuiMenu>
  )
}
