import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import Label from '../atoms/display/Label'
import { useDispatch, useSelector } from 'react-redux'
import { FlexColumn } from '../atoms/layout/Flex'
import { deleteFolder, deleteNote } from '../../store/notes/actions'
import { trashFoldersSelector, trashNotesSelector } from '../../store/notes/selectors'

type TrashEmptyDialogProps = {
  open: boolean
  onClose: () => void
}

export default function TrashEmptyDialog({ open, onClose }: TrashEmptyDialogProps) {
  const folders = useSelector(trashFoldersSelector)
  const notes = useSelector(trashNotesSelector)
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    folders.forEach((folder) => dispatch(deleteFolder({ folder })))
    notes.forEach((note) => dispatch(deleteNote({ note })))
    onClose()
  }, [dispatch, folders, notes, onClose])

  return (
    <ConfirmDialog open={open} title={'Empty trash'} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <Label>Do you want to delete items in trash?</Label>
        <Label>This operation is irreversible.</Label>
      </FlexColumn>
    </ConfirmDialog>
  )
}
