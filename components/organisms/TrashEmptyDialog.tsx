import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import Label from '../atoms/display/Label'
import { useDispatch, useSelector } from 'react-redux'
import { FlexColumn } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useTrashEmptyDialog } from '../../hooks/useDialogs'

export default function TrashEmptyDialog() {
  const { state, close } = useTrashEmptyDialog()
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    folders.forEach((folder) => dispatch(NotesActions.deleteFolder({ folder })))
    notes.forEach((note) => dispatch(NotesActions.deleteNote({ note })))
    close()
  }, [dispatch, folders, notes, close])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Empty trash' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <Label text={{ value: 'Do you want to delete items in trash?' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
