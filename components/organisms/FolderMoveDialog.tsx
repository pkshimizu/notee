import { Folder } from '../../store/notes/models'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { rootFolderSelector } from '../../store/notes/selectors'
import { updateFolder } from '../../store/notes/actions'

type FolderMoveDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

export default function FolderMoveDialog({ open, folder, onClose }: FolderMoveDialogProps) {
  const root = useSelector(rootFolderSelector)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      if (folder.id !== id) {
        dispatch(updateFolder({ folder, folderId: id }))
      }
    },
    [dispatch, folder]
  )
  if (root) {
    return <FolderSelectDialog open={open} root={root} onClose={onClose} onSelect={handleSelect} />
  }

  return <></>
}
