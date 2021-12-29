import { deleteFolder, deleteNote, Folder } from '../../store/notes'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import Flex from '../atoms/layout/Flex'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'

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
      <Flex direction={'column'}>
        <Flex direction={'row'}>
          <FolderIcon />
          <Label>{folder.name}</Label>
        </Flex>
        <Label>このフォルダーを削除しますか？</Label>
      </Flex>
    </ConfirmDialog>
  )
}
