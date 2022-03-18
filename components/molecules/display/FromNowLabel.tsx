import { useDay } from '../../../hooks/useDay'
import Label from '../../atoms/display/Label'

type FromNowLabelProps = {
  datetime: string
}

export default function FromNowLabel({ datetime }: FromNowLabelProps) {
  const { fromNow } = useDay()
  
  return <Label text={fromNow(datetime)} />
}
