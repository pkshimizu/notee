import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import { useFolderMoveToTrashDialog } from '../../hooks/useDialogs'

type FolderMoveToTrashDialogProps = {
  folder: Folder
}

export default function FolderMoveToTrashDialog({ folder }: FolderMoveToTrashDialogProps) {
  const { state, close } = useFolderMoveToTrashDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(NotesActions.moveFolderToTrash({ folder }))
  }, [dispatch, folder])

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
