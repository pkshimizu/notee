import MuiMenuItem from '@mui/material/MenuItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemText from '@mui/material/ListItemText'
import { ReactNode } from 'react'

type MenuItemProps = {
  icon?: ReactNode
  children: string
  onClick?: () => void
}

export default function MenuItem({ icon, children, onClick }: MenuItemProps) {
  return (
    <MuiMenuItem onClick={onClick}>
      <MuiListItemIcon>{icon}</MuiListItemIcon>
      <MuiListItemText>{children}</MuiListItemText>
    </MuiMenuItem>
  )
}
