import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { moveFolderToTrash, moveNoteToTrash } from '../../store/notes/actions'

type FolderMoveToTrashDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

const moveFolderItemsToTrash = async (dispatch: Dispatch<any>, folder: Folder) => {
  for (const subFolder of folder.folders) {
    await moveFolderItemsToTrash(dispatch, subFolder)
  }
  for (const note of folder.notes) {
    await dispatch(moveNoteToTrash({ note: note }))
  }
  await dispatch(moveFolderToTrash({ folder: folder }))
}

export default function FolderMoveToTrashDialog({ open, folder, onClose }: FolderMoveToTrashDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await moveFolderItemsToTrash(dispatch, folder)
    onClose()
  }, [dispatch, folder, onClose])

  return (
    <ConfirmDialog open={open} title={'Move To Trash'} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label>{folder.name}</Label>
        </FlexRow>
        <Label>Do you want to move this folder to Trash?</Label>
        <Label>Items in folder will also be moved to Trash.</Label>
      </FlexColumn>
    </ConfirmDialog>
  )
}
