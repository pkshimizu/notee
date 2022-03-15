import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import { useFolderMoveToTrashDialog } from '../../hooks/useDialogs'

const moveFolderItemsToTrash = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => moveFolderItemsToTrash(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(NotesActions.moveNoteToTrash({ note: note })))
  dispatch(NotesActions.moveFolderToTrash({ folder: folder }))
}

type FolderMoveToTrashDialogProps = {
  folder: Folder
}

export default function FolderMoveToTrashDialog({ folder }: FolderMoveToTrashDialogProps) {
  const { state, close } = useFolderMoveToTrashDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await moveFolderItemsToTrash(dispatch, folder)
    close()
  }, [dispatch, folder, close])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Move To Trash' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label text={{ value: folder.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to move this folder to Trash?' }} />
        <Label text={{ value: 'Items in folder will also be moved to Trash.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
