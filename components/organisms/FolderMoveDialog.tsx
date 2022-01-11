import { Folder, rootFolderSelector, updateFolder } from '../../store/notes'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

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
      dispatch(updateFolder({ folder, folderId: id }))
    },
    [dispatch, folder]
  )
  if (root) {
    return <FolderSelectDialog open={open} root={root} onClose={onClose} onSelect={handleSelect} />
  }

  return <></>
}
