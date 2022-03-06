import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import Label from '../atoms/display/Label'
import { useDispatch, useSelector } from 'react-redux'
import { FlexColumn } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'

type TrashEmptyDialogProps = {
  open: boolean
  onClose: () => void
}

export default function TrashEmptyDialog({ open, onClose }: TrashEmptyDialogProps) {
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    folders.forEach((folder) => dispatch(NotesActions.deleteFolder({ folder })))
    notes.forEach((note) => dispatch(NotesActions.deleteNote({ note })))
    onClose()
  }, [dispatch, folders, notes, onClose])

  return (
    <ConfirmDialog open={open} title={{ value: 'Empty trash' }} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <Label text={{ value: 'Do you want to delete items in trash?' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
