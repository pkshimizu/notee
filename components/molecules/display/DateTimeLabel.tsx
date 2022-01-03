import Label from '../../atoms/display/Label'
import dayjs from 'dayjs'

type DateTimeLabelProps = {
  datetime: string
}

export default function DateTimeLabel({ datetime }: DateTimeLabelProps) {
  return <Label>{dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')}</Label>
}
