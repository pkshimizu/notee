import { Note } from '../../../models/note'
import Label from '../../atoms/display/Label'

type NoteTitleLabelProps = {
  note: Note
}

function truncate(text: string) {
  return text.length <= 10 ? text : text.substr(0, 8) + '...'
}

function makeNoteTitle(note: Note) {
  if (note.content && note.content.length > 0) {
    return truncate(note.content.split('\n')[0])
  }

  return '名前なし'
}

export default function NoteTitleLabel({ note }: NoteTitleLabelProps) {
  const title = makeNoteTitle(note)

  return <Label>{title}</Label>
}
