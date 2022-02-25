import { Note } from '../../store/notes/models'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { updateNote } from '../../store/notes/actions'
import NotesSelectors from "../../store/notes/selectors";

type NoteMoveDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteMoveDialog({ open, note, onClose }: NoteMoveDialogProps) {
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(updateNote({ note, folderId: id }))
    },
    [dispatch, note]
  )
  if (root) {
    return (
      <FolderSelectDialog
        title={{ value: 'Move To' }}
        open={open}
        root={root}
        onClose={onClose}
        onSelect={handleSelect}
      />
    )
  }

  return <></>
}
