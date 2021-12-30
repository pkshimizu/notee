import { Note } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { OpenIcon } from '../../atoms/display/Icons'
import { useCallback, useContext } from 'react'
import { Router } from '../../systems/RouterProvider'
import NoteTitleLabel from "../display/NoteTitleLabel";

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const { go } = useContext(Router)
  const handleOpenNote = useCallback(() => {
    go(`/notes/${note.id}`)
  }, [go])
  
  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <IconButton onClick={handleOpenNote}>
          <OpenIcon />
        </IconButton>
      }
    >

    </Card>
  )
}
