import MuiButton from '@mui/material/Button'
import { ReactNode } from 'react'

type ButtonProps = {
  icon?: ReactNode
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  children: ReactNode
  onClick: (target: EventTarget) => void
}

export default function Button({ icon, variant = 'contained', disabled = false, children, onClick }: ButtonProps) {
  return (
    <MuiButton
      startIcon={icon}
      variant={variant}
      disabled={disabled}
      disableElevation
      sx={{
        textTransform: 'none',
      }}
      onClick={(e) => onClick(e.target)}
    >
      {children}
    </MuiButton>
  )
}
