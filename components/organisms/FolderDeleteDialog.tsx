import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { deleteFolder, deleteNote } from '../../store/notes/actions'

type FolderDeleteDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

const deleteFolderItems = async (dispatch: Dispatch<any>, folder: Folder) => {
  for (const subFolder of folder.folders) {
    await deleteFolderItems(dispatch, subFolder)
  }
  for (const note of folder.notes) {
    await dispatch(deleteNote({ note: note }))
  }
  await dispatch(deleteFolder({ folder: folder }))
}

export default function FolderDeleteDialog({ open, folder, onClose }: FolderDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await deleteFolderItems(dispatch, folder)
    onClose()
  }, [dispatch, folder, onClose])

  return (
    <ConfirmDialog open={open} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label>{folder.name}</Label>
        </FlexRow>
        <Label>このフォルダーを削除しますか？</Label>
      </FlexColumn>
    </ConfirmDialog>
  )
}
