import Label from '../../atoms/display/Label'

type CapacityLabelProps = {
  bytes: number
}

const sizeToText = (size: number, units: string[]): string => {
  if (size < 1024 || units.length === 1) {
    return `${size} ${units[0]}`
  }
  units.shift()

  return sizeToText(Math.floor((size * 100) / 1024) / 100, units)
}

export default function CapacityLabel({ bytes }: CapacityLabelProps) {
  const units: string[] = ['B', 'KB', 'MB', 'GB']
  const text = sizeToText(bytes, units)

  return <Label text={{ value: text, plain: true }} />
}
