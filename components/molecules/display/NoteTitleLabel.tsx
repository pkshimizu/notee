import Label from '../../atoms/display/Label'
import { Note } from '../../../store/notes'

type NoteTitleLabelProps = {
  note: Note
}

function truncate(text: string): string {
  return text.length <= 30 ? text : text.substr(0, 8) + '...'
}

export default function NoteTitleLabel({ note }: NoteTitleLabelProps) {
  const title = truncate(note.title)

  return <Label>{title}</Label>
}
