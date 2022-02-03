import MuiBackdrop from '@mui/material/Backdrop'
import { ReactNode } from 'react'

type BackdropProps = {
  open: boolean
  children: ReactNode
  onClose?: () => void
}

export default function Backdrop({ open, children, onClose }: BackdropProps) {
  return (
    <MuiBackdrop
      open={open}
      sx={{
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      {children}
    </MuiBackdrop>
  )
}
