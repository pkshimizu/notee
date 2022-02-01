import MuiButton from '@mui/material/Button'
import { ReactNode } from 'react'

type ButtonColor = 'primary' | 'google' | 'github'

type ButtonProps = {
  icon?: ReactNode
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  color?: ButtonColor
  children: ReactNode
  onClick: (_target: EventTarget) => void
}

export default function Button({
  icon,
  variant = 'contained',
  disabled = false,
  color = 'primary',
  children,
  onClick,
}: ButtonProps) {
  return (
    <MuiButton
      startIcon={icon}
      variant={variant}
      disabled={disabled}
      color={color}
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
