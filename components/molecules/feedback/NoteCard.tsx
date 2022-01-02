import { Note } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { DeleteIcon, OpenIcon } from '../../atoms/display/Icons'
import { useCallback, useState } from 'react'
import NoteTitleLabel from '../display/NoteTitleLabel'
import DateTimeLabel from '../DateTimeLabel'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import Label from '../../atoms/display/Label'
import { useNotesPage } from '../../../hooks/usePages'
import NoteDeleteDialog from '../../organisms/NoteDeleteDialog'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const [openDelete, setOpenDelete] = useState(false)
  const notesPage = useNotesPage()
  const handleOpenNote = useCallback(() => {
    notesPage(note.id)
  }, [notesPage, note])
  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true)
  }, [])
  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false)
  }, [])

  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <>
          <IconButton onClick={handleOpenNote}>
            <OpenIcon />
          </IconButton>
          <IconButton onClick={handleOpenDelete}>
            <DeleteIcon />
          </IconButton>
          <NoteDeleteDialog open={openDelete} note={note} onClose={handleCloseDelete} />
        </>
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
