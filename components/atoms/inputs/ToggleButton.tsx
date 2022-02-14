import MuiToggleButton from '@mui/material/ToggleButton'
import { ReactElement } from 'react'
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type ToggleButtonItem = {
  value: string
  content: ReactElement
}

type ToggleButtonProps = {
  value: string
  items: ToggleButtonItem[]
  vertical?: boolean
  onChange: (_value: string) => void
}

export default function ToggleButton({ value, items, vertical, onChange }: ToggleButtonProps) {
  return (
    <MuiToggleButtonGroup
      value={value}
      orientation={vertical ? 'vertical' : 'horizontal'}
      exclusive
      sx={{ flexGrow: 1 }}
      onChange={(e, value) => onChange(value)}
    >
      {items.map((item) => (
        <MuiToggleButton key={item.value} value={item.value} sx={{ textTransform: 'none' }}>
          {item.content}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  )
}
