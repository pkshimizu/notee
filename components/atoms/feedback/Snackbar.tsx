import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import { useLocale } from '../../../hooks/useLocale'

type SnackbarProps = {
  open: boolean
  message: string
  severity: AlertColor
  onClose: () => void
}

export default function Snackbar({ open, message, severity, onClose }: SnackbarProps) {
  const { t } = useLocale()

  return (
    <MuiSnackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <MuiAlert severity={severity} variant={'filled'} onClose={onClose}>
        {t(message)}
      </MuiAlert>
    </MuiSnackbar>
  )
}
