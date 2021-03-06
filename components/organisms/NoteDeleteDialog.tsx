import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { NoteIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'
import { Note } from '../../store/notes/models'

type NoteDeleteDialogProps = {
  note: Note
}

export default function NoteDeleteDialog({ note }: NoteDeleteDialogProps) {
  const { state, close } = useNoteDeleteDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(NotesActions.deleteNote({ note: note }))
  }, [dispatch, note])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Delete' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <NoteIcon />
          <NoteTitleLabel note={note} />
        </FlexRow>
        <Label text={{ value: 'Do you want to delete this note?' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
