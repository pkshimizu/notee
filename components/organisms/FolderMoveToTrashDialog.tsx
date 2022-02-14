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

const moveFolderItemsToTrash = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => moveFolderItemsToTrash(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(moveNoteToTrash({ note: note })))
  dispatch(moveFolderToTrash({ folder: folder }))
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
          <Label text={folder.name} plain />
        </FlexRow>
        <Label text={'Do you want to move this folder to Trash?'} />
        <Label text={'Items in folder will also be moved to Trash.'} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
