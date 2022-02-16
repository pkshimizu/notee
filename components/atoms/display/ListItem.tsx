import { ReactElement, ReactNode } from 'react'
import MuiListItem from '@mui/material/ListItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemButton from '@mui/material/ListItemButton'
import MuiListItemText from '@mui/material/ListItemText'
import { LabelText, useLocale } from '../../../hooks/useLocale'

type ListItemProps = {
  icon?: ReactElement
  label?: LabelText
  children?: ReactElement
  onClick?: () => void
}

function ListItemWrapper({ onClick, children }: { onClick?: () => void; children: ReactNode }) {
  if (onClick) {
    return <MuiListItemButton onClick={onClick}>{children}</MuiListItemButton>
  }

  return <>{children}</>
}

export default function ListItem({ icon, label, children, onClick }: ListItemProps) {
  const { t } = useLocale()
  
  return (
    <MuiListItem disablePadding>
      <ListItemWrapper onClick={onClick}>
        {icon && <MuiListItemIcon>{icon}</MuiListItemIcon>}
        {label && <MuiListItemText primary={t(label)} />}
        {children}
      </ListItemWrapper>
    </MuiListItem>
  )
}
