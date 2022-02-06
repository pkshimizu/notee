import { ReactNode } from 'react'
import MuiIconButton from '@mui/material/IconButton'
import MuiTooltip from '@mui/material/Tooltip'
import { IconColor } from '../display/Icons'

type IconButtonProps = {
  label: string
  color?: IconColor
  disabled?: boolean
  children: ReactNode
  onClick: () => void
}

export default function IconButton({ label, color, disabled = false, children, onClick }: IconButtonProps) {
  return (
    <MuiTooltip title={label}>
      <span>
        <MuiIconButton aria-label={label} color={color} disabled={disabled} onClick={onClick}>
          {children}
        </MuiIconButton>
      </span>
    </MuiTooltip>
  )
}
