import { FontSize } from '../../atoms/inputs/TextEditor'
import Select from '../../atoms/inputs/Select'

type FontSizeSelectProps = {
  value: FontSize
  onChange: (_value: FontSize) => void
}

export default function FontSizeSelect({ value, onChange }: FontSizeSelectProps) {
  const sizeList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32]

  return (
    <Select
      value={value}
      items={sizeList.map((size) => ({
        value: size,
        label: `${size}px`,
      }))}
      label={'Font Size'}
      onChange={(value) => onChange(value as FontSize)}
    />
  )
}
