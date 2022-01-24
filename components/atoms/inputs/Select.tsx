import MuiSelect from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiFormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'

type SelectItem = {
  value: string
  label: string
}

type SelectProps = {
  value: string
  items: SelectItem[]
  label: string
  onChange: (_value: string) => void
}

export default function Select({ value, items, label, onChange }: SelectProps) {
  return (
    <MuiFormControl variant={'standard'}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={(e) => onChange(e.target.value)}>
        {items.map((item) => (
          <MuiMenuItem key={item.value} value={item.value}>
            {item.label}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </MuiFormControl>
  )
}
