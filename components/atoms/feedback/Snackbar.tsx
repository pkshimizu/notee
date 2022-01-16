import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

type SnackbarProps = {
  open: boolean
  message: string
  severity: AlertColor
  onClose: () => void
}

export default function Snackbar({ open, message, severity, onClose }: SnackbarProps) {
  return (
    <MuiSnackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <MuiAlert severity={severity} variant={'filled'} onClose={onClose}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
