import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useNoteMoveDialog } from '../../hooks/useDialogs'
import { Note } from '../../store/notes/models'

type NoteMoveDialogProps = {
  note: Note
}

export default function NoteMoveDialog({ note }: NoteMoveDialogProps) {
  const { state, close } = useNoteMoveDialog()
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(NotesActions.updateNote({ note: note, folderId: id }))
    },
    [dispatch, note]
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
