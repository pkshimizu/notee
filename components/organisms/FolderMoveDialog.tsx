import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useFolderMoveDialog } from '../../hooks/useDialogs'

export default function FolderMoveDialog() {
  const { state, close } = useFolderMoveDialog()
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      if (state) {
        dispatch(NotesActions.updateFolder({ folder: state.folder, folderId: id }))
      }
    },
    [dispatch, state]
  )
  if (root) {
    return (
      <FolderSelectDialog
        title={{ value: 'Move To' }}
        open={state !== undefined}
        root={root}
        targetFolder={state?.folder}
        onClose={close}
        onSelect={handleSelect}
      />
    )
  }

  return <></>
}
