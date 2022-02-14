import MuiTextField from '@mui/material/TextField'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ReactElement } from 'react'
import { InputAdornment } from '@mui/material'
import { useLocale } from '../../../hooks/useLocale'

type TextSize = 'sm' | 'md' | 'lg'

type TextFieldProps = {
  label?: string
  value?: string
  size?: TextSize
  focused?: boolean
  readonly?: boolean
  icon?: ReactElement
  register?: UseFormRegisterReturn
  error?: any
}

const width = (size?: TextSize) => {
  switch (size) {
  case 'sm':
    return 240
  case 'md':
    return 360
  case 'lg':
    return 480
  default:
    return '100%'
  }
}

export default function TextField({ label, value, size, focused, readonly, icon, register, error }: TextFieldProps) {
  const { t } = useLocale()

  return (
    <MuiTextField
      label={label && t(label)}
      value={value}
      variant={'filled'}
      autoFocus={focused}
      focused={focused}
      disabled={readonly}
      sx={{ width: width(size) }}
      InputProps={{
        startAdornment: icon && <InputAdornment position={'start'}>{icon}</InputAdornment>,
      }}
      {...register}
      error={error}
      helperText={error}
      size={'small'}
    />
  )
}
