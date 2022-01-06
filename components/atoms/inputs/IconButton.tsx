import { ReactNode } from 'react'
import MuiIconButton from '@mui/material/IconButton'

type IconButtonProps = {
  disabled?: boolean
  children: ReactNode
  onClick: () => void
}

export default function IconButton({ disabled = false, children, onClick }: IconButtonProps) {
  return (
    <MuiIconButton disabled={disabled} onClick={onClick}>
      {children}
    </MuiIconButton>
  )
}
