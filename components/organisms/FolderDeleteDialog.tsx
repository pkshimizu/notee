import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'

type FolderDeleteDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

const deleteFolderItems = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => deleteFolderItems(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(NotesActions.deleteNote({ note: note })))
  dispatch(NotesActions.deleteFolder({ folder: folder }))
}

export default function FolderDeleteDialog({ open, folder, onClose }: FolderDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await deleteFolderItems(dispatch, folder)
    onClose()
  }, [dispatch, folder, onClose])

  return (
    <ConfirmDialog open={open} title={{ value: 'Delete' }} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label text={{ value: folder.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to delete this folder?' }} />
        <Label text={{ value: 'Items in folder will also be delete.' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
