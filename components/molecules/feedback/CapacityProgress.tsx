import LinearProgress from '../../atoms/feedback/LinearProgress'

type CapacityProgressProps = {
  value: number
  max: number
}

export default function CapacityProgress({ value, max }: CapacityProgressProps) {
  return <LinearProgress value={(value / max) * 100} variant={'determinate'} />
}
