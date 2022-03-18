import MuiTooltip from '@mui/material/Tooltip'
import { ReactElement } from 'react'

type TooltipProps = {
  label: ReactElement
  children: ReactElement
}

export default function Tooltip({ label, children }: TooltipProps) {
  return <MuiTooltip title={label}>{children}</MuiTooltip>
}
