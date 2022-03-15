import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { NoteIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import { Note } from '../../store/notes/models'

type NoteMoveToTrashDialogProps = {
  note: Note
}

export default function NoteMoveToTrashDialog({ note }: NoteMoveToTrashDialogProps) {
  const { state, close } = useNoteMoveToTrashDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(NotesActions.moveNoteToTrash({ note: note }))
  }, [dispatch, note])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Move To Trash' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <NoteIcon />
          <NoteTitleLabel note={note} />
        </FlexRow>
        <Label text={{ value: 'Do you want to move this note to Trash?' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
