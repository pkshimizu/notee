import { useDay } from '../../../hooks/useDay'
import Label, { LabelVariant } from '../../atoms/display/Label'

type FromNowLabelProps = {
  datetime: string
  variant?: LabelVariant
}

export default function FromNowLabel({ datetime, variant }: FromNowLabelProps) {
  const { fromNow } = useDay()

  return <Label text={fromNow(datetime)} variant={variant} />
}
