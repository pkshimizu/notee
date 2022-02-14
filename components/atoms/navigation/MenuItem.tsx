import MuiMenuItem from '@mui/material/MenuItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemText from '@mui/material/ListItemText'
import { ReactNode } from 'react'
import { useLocale } from '../../../hooks/useLocale'

type MenuItemProps = {
  icon?: ReactNode
  children: string
  onClick?: () => void
}

export default function MenuItem({ icon, children, onClick }: MenuItemProps) {
  const { t } = useLocale()

  return (
    <MuiMenuItem onClick={onClick}>
      {icon && <MuiListItemIcon>{icon}</MuiListItemIcon>}
      <MuiListItemText>{t(children)}</MuiListItemText>
    </MuiMenuItem>
  )
}
