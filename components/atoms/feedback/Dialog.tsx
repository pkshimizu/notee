import MuiDialog from '@mui/material/Dialog'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import { ReactNode } from 'react'

type DialogProps = {
  open: boolean
  title?: string
  children: ReactNode
  actions?: ReactNode
  onClose: () => void
}

export default function Dialog({ open, title, children, actions, onClose }: DialogProps) {
  return (
    <MuiDialog open={open} onClose={onClose}>
      {title && <MuiDialogTitle>{title}</MuiDialogTitle>}
      <MuiDialogContent>{children}</MuiDialogContent>
      {actions && <MuiDialogActions>{actions}</MuiDialogActions>}
    </MuiDialog>
  )
}
