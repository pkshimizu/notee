import { Note } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { OpenIcon } from '../../atoms/display/Icons'
import { useCallback } from 'react'
import NoteTitleLabel from '../display/NoteTitleLabel'
import DateTimeLabel from '../DateTimeLabel'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import Label from '../../atoms/display/Label'
import { useNotesPage } from '../../../hooks/usePages'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const notesPage = useNotesPage()
  const handleOpenNote = useCallback(() => {
    notesPage(note.id)
  }, [notesPage, note])

  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <IconButton onClick={handleOpenNote}>
          <OpenIcon />
        </IconButton>
      }
    >
      <FlexColumn>
        <FlexRow>
          <Label>作成日時</Label>
          <DateTimeLabel datetime={note.createdAt} />
        </FlexRow>
        <FlexRow>
          <Label>更新日時</Label>
          <DateTimeLabel datetime={note.updatedAt} />
        </FlexRow>
      </FlexColumn>
    </Card>
  )
}
