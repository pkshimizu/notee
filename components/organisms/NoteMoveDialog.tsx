import { Note, rootFolderSelector, updateNote } from '../../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'

type NoteMoveDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteMoveDialog({ open, note, onClose }: NoteMoveDialogProps) {
  const root = useSelector(rootFolderSelector)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      if (note.id !== id) {
        dispatch(updateNote({ note, folderId: id }))
      }
    },
    [dispatch, note]
  )
  if (root) {
    return <FolderSelectDialog open={open} root={root} onClose={onClose} onSelect={handleSelect} />
  }
  
  return <></>
}
