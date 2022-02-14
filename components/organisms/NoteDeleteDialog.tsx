import { Note } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { deleteNote } from '../../store/notes/actions'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'

type NoteDeleteDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteDeleteDialog({ open, note, onClose }: NoteDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await dispatch(deleteNote({ note: note }))
    onClose()
  }, [dispatch, note, onClose])

  return (
    <ConfirmDialog open={open} title={'Delete'} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <NoteTitleLabel note={note} />
        </FlexRow>
        <Label text={'Do you want to delete this note?'} />
        <Label text={'This operation is irreversible.'} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
