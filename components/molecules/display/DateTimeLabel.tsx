import Label from '../../atoms/display/Label'
import { useDay } from '../../../hooks/useDay'

type DateTimeLabelProps = {
  datetime: string
}

export default function DateTimeLabel({ datetime }: DateTimeLabelProps) {
  const { dateTimeFormatter } = useDay()

  return <Label text={dateTimeFormatter(datetime)} />
}
