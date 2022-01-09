import MuiTextField from '@mui/material/TextField'
import { useCallback } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type TextSize = 'sm' | 'md' | 'lg'

type TextFieldProps = {
  label?: string
  value?: string
  size?: TextSize
  focused?: boolean
  register: UseFormRegisterReturn
  error?: any
}

const width = (size: TextSize) => {
  switch (size) {
  case 'sm':
    return 240
  case 'md':
    return 360
  case 'lg':
    return 480
  }
}

export default function TextField({ label, value, size = 'md', focused, register, error }: TextFieldProps) {
  const handlePress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }, [])

  return (
    <MuiTextField
      label={label}
      value={value}
      variant={'filled'}
      autoFocus={focused}
      focused={focused}
      onKeyPress={handlePress}
      sx={{ width: width(size) }}
      {...register}
      error={error}
      helperText={error}
    />
  )
}
