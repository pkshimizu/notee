import { Note } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { deleteNote } from '../../store/notes/actions'

type NoteDeleteDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteDeleteDialog({ open, note, onClose }: NoteDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(deleteNote({ note: note }))
    onClose()
  }, [dispatch, note, onClose])

  return (
    <ConfirmDialog open={open} title={'Move To Trash'} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label>{note.title}</Label>
        </FlexRow>
        <Label>Do you want to move this note to Trash?</Label>
      </FlexColumn>
    </ConfirmDialog>
  )
}
