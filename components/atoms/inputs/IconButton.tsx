import { ReactNode } from 'react'
import MuiIconButton from '@mui/material/IconButton'
import MuiTooltip from '@mui/material/Tooltip'

type IconButtonProps = {
  label: string
  disabled?: boolean
  children: ReactNode
  onClick: () => void
}

export default function IconButton({ label, disabled = false, children, onClick }: IconButtonProps) {
  return (
    <MuiTooltip title={label}>
      <MuiIconButton aria-label={label} disabled={disabled} onClick={onClick}>
        {children}
      </MuiIconButton>
    </MuiTooltip>
  )
}
