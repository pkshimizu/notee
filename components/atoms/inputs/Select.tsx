import MuiSelect from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiFormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import { useLocale } from '../../../hooks/useLocale'

type SelectItem = {
  value: string | number
  label: string | number
}

type SelectProps = {
  value: string | number
  items: SelectItem[]
  label: string
  onChange: (_value: string | number) => void
}

export default function Select({ value, items, label, onChange }: SelectProps) {
  const { t } = useLocale()

  return (
    <MuiFormControl variant={'standard'}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={(e) => onChange(e.target.value)}>
        {items.map((item) => (
          <MuiMenuItem key={item.value} value={item.value}>
            {t(String(item.label))}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </MuiFormControl>
  )
}
