import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import { useFolderDeleteDialog } from '../../hooks/useDialogs'

type FolderDeleteDialogProps = {
  folder: Folder
}

export default function FolderDeleteDialog({ folder }: FolderDeleteDialogProps) {
  const { state, close } = useFolderDeleteDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(NotesActions.deleteFolder({ folder: folder }))
  }, [dispatch, folder])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Delete' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label text={{ value: folder?.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to delete this folder?' }} />
        <Label text={{ value: 'Items in folder will also be delete.' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
