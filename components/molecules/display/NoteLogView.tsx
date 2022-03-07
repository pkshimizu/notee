import { Note, NoteLog } from '../../../store/notes/models'
import DiffView from '../../atoms/display/DiffView'
import { useEffect, useState } from 'react'
import useNoteLog from '../../../hooks/useNoteLog'

type NoteLogViewProps = {
  note: Note
  log: NoteLog
}

export default function NoteLogView({ note, log }: NoteLogViewProps) {
  const { restore } = useNoteLog()
  const [contents, setContents] = useState({ content: '', nextContent: '' })
  useEffect(() => {
    setContents(restore(note.logs, log.id))
  }, [note, log, restore, setContents])

  return <DiffView content1={contents.content} content2={contents.nextContent} />
}
