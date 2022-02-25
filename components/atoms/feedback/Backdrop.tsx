import MuiBackdrop from '@mui/material/Backdrop'
import { Component } from '../../../types/react'

type BackdropProps = {
  open: boolean
  children: Component
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
