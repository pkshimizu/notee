import { ReactNode } from 'react'
import MuiListItem from '@mui/material/ListItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemButton from '@mui/material/ListItemButton'
import MuiListItemText from '@mui/material/ListItemText'

type ListItemProps = {
  icon?: ReactNode
  label?: ReactNode
  onClick?: () => void
}

function ListItemWrapper({ onClick, children }: { onClick?: () => void; children: ReactNode }) {
  if (onClick) {
    return <MuiListItemButton onClick={onClick}>{children}</MuiListItemButton>
  }

  return <>{children}</>
}

export default function ListItem({ icon, label, onClick }: ListItemProps) {
  return (
    <MuiListItem disablePadding>
      <ListItemWrapper onClick={onClick}>
        {icon && <MuiListItemIcon>{icon}</MuiListItemIcon>}
        {label && <MuiListItemText primary={label} />}
      </ListItemWrapper>
    </MuiListItem>
  )
}
