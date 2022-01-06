import MuiDialog from '@mui/material/Dialog'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import { ReactNode } from 'react'

type DialogProps = {
  open: boolean
  title?: ReactNode
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  actions?: ReactNode
  onClose: () => void
}

export default function Dialog({ open, title, width = 'sm', children, actions, onClose }: DialogProps) {
  return (
    <MuiDialog open={open} maxWidth={width} onClose={onClose}>
      {title && <MuiDialogTitle>{title}</MuiDialogTitle>}
      <MuiDialogContent>{children}</MuiDialogContent>
      {actions && <MuiDialogActions>{actions}</MuiDialogActions>}
    </MuiDialog>
  )
}
