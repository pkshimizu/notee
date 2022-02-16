import MuiSelect from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiFormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import { LabelText, useLocale } from '../../../hooks/useLocale'

type SelectItem = {
  value: string | number
  label: LabelText
}

type SelectProps = {
  value: string | number
  items: SelectItem[]
  label: LabelText
  onChange: (_value: string | number) => void
}

export default function Select({ value, items, label, onChange }: SelectProps) {
  const { t } = useLocale()

  return (
    <MuiFormControl variant={'standard'}>
      <InputLabel>{t(label)}</InputLabel>
      <MuiSelect value={value} label={t(label)} onChange={(e) => onChange(e.target.value)}>
        {items.map((item) => (
          <MuiMenuItem key={item.value} value={item.value}>
            {t(item.label)}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </MuiFormControl>
  )
}
