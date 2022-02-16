import { ReactElement } from 'react'
import MuiIconButton from '@mui/material/IconButton'
import MuiTooltip from '@mui/material/Tooltip'
import { IconColor } from '../display/Icons'
import { LabelText, useLocale } from '../../../hooks/useLocale'

type IconButtonProps = {
  label: LabelText
  color?: IconColor
  disabled?: boolean
  children: ReactElement
  onClick: () => void
}

export default function IconButton({ label, color, disabled = false, children, onClick }: IconButtonProps) {
  const { t } = useLocale()
  const translatedLabel = t(label)

  return (
    <MuiTooltip title={translatedLabel}>
      <span>
        <MuiIconButton aria-label={translatedLabel} color={color} disabled={disabled} onClick={onClick}>
          {children}
        </MuiIconButton>
      </span>
    </MuiTooltip>
  )
}
