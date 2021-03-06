import MuiButton from '@mui/material/Button'
import { Component } from '../../../types/react'
import { ReactElement } from 'react'

type ButtonColor = 'primary' | 'google' | 'github'

type ButtonProps = {
  icon?: ReactElement
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  color?: ButtonColor
  children: Component
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
