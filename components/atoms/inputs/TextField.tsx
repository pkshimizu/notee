import MuiTextField from '@mui/material/TextField'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { InputAdornment } from '@mui/material'

type TextSize = 'sm' | 'md' | 'lg'

type TextFieldProps = {
  label?: string
  value?: string
  size?: TextSize
  focused?: boolean
  readonly?: boolean
  icon?: ReactNode
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
  return (
    <MuiTextField
      label={label}
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
