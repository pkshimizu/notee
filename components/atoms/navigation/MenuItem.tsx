import MuiMenuItem from '@mui/material/MenuItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemText from '@mui/material/ListItemText'
import { ReactElement } from 'react'
import { LabelText, useLocale } from '../../../hooks/useLocale'

type MenuItemProps = {
  icon?: ReactElement
  label: LabelText
  onClick?: () => void
}

export default function MenuItem({ icon, label, onClick }: MenuItemProps) {
  const { t } = useLocale()

  return (
    <MuiMenuItem onClick={onClick}>
      {icon && <MuiListItemIcon>{icon}</MuiListItemIcon>}
      <MuiListItemText>{t(label)}</MuiListItemText>
    </MuiMenuItem>
  )
}
