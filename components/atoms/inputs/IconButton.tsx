import { ReactNode } from 'react'
import MuiIconButton from '@mui/material/IconButton'

type IconButtonProps = {
  label: string
  disabled?: boolean
  children: ReactNode
  onClick: () => void
}

export default function IconButton({ label, disabled = false, children, onClick }: IconButtonProps) {
  return (
    <MuiIconButton aria-label={label} disabled={disabled} onClick={onClick}>
      {children}
    </MuiIconButton>
  )
}
