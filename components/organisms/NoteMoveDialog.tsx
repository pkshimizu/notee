import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useNoteMoveDialog } from '../../hooks/useDialogs'

export default function NoteMoveDialog() {
  const { state, close } = useNoteMoveDialog()
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      if (state) {
        dispatch(NotesActions.updateNote({ note: state.note, folderId: id }))
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
        onClose={close}
        onSelect={handleSelect}
      />
    )
  }

  return <></>
}
