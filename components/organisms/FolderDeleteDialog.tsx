import { Folder } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import { useFolderDeleteDialog } from '../../hooks/useDialogs'

const deleteFolderItems = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => deleteFolderItems(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(NotesActions.deleteNote({ note: note })))
  dispatch(NotesActions.deleteFolder({ folder: folder }))
}

export default function FolderDeleteDialog() {
  const { state, close } = useFolderDeleteDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    if (state) {
      await deleteFolderItems(dispatch, state.folder)
    }
    close()
  }, [dispatch, state, close])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Delete' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label text={{ value: state?.folder?.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to delete this folder?' }} />
        <Label text={{ value: 'Items in folder will also be delete.' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
