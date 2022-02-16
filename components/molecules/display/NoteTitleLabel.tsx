import Label from '../../atoms/display/Label'
import { Note } from '../../../store/notes/models'
import { useNote } from '../../../hooks/useNote'

type NoteTitleLabelProps = {
  note: Note
}

export default function NoteTitleLabel({ note }: NoteTitleLabelProps) {
  const { title } = useNote(note)

  return <Label text={title()} />
}
