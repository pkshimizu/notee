import Label from '../../atoms/display/Label'
import { Note } from '../../../store/notes/models'
import { useNote } from '../../../hooks/useNote'

type NoteTitleLabelProps = {
  note: Note
}

function truncate(text: string): string {
  return text.length <= 30 ? text : text.substr(0, 30) + '...'
}

export default function NoteTitleLabel({ note }: NoteTitleLabelProps) {
  const { title } = useNote(note)

  return <Label text={truncate(title())} plain />
}
