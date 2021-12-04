import MuiButton from '@mui/material/Button'
import { ReactNode } from 'react'

type ButtonProps = {
  icon?: ReactNode
  variant?: 'text' | 'contained' | 'outlined'
  children: ReactNode
  onClick: (target: EventTarget) => void
}

export default function Button({ icon, variant = 'contained', children, onClick }: ButtonProps) {
  return (
    <MuiButton
      startIcon={icon}
      variant={variant}
      sx={{
        textTransform: 'none',
      }}
      onClick={(e) => onClick(e.target)}
    >
      {children}
    </MuiButton>
  )
}
