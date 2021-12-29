import MuiTextField from '@mui/material/TextField'
import { useCallback, useRef, useState } from 'react'

type TextValidation = {
  required?: boolean
  maxLength?: number
  pattern?: string
}

type TextSize = 'sm' | 'md' | 'lg'

type TextFieldProps = {
  label?: string
  value?: string
  validation?: TextValidation
  size?: TextSize
  onChange: (value: string) => void
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

export default function TextField({ label, value, validation, size = 'md', onChange }: TextFieldProps) {
  const inputRef = useRef<any | undefined>(undefined)
  const [error, setError] = useState(false)
  const handleChange = useCallback(
    (e) => {
      const ref = inputRef.current
      if (ref) {
        setError(!ref.validity.valid)
      }
      onChange(e.target.value)
    },
    [onChange]
  )
  const handlePress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }, [])

  return (
    <MuiTextField
      label={label}
      value={value}
      error={error}
      variant={'filled'}
      inputRef={inputRef}
      inputProps={validation}
      helperText={inputRef?.current?.validationMessage}
      onChange={handleChange}
      onKeyPress={handlePress}
      sx={{ width: width(size) }}
    />
  )
}
