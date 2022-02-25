import { Folder } from '../../store/notes/models'
import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { updateFolder } from '../../store/notes/actions'
import NotesSelectors from "../../store/notes/selectors";

type FolderMoveDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

export default function FolderMoveDialog({ open, folder, onClose }: FolderMoveDialogProps) {
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(updateFolder({ folder, folderId: id }))
    },
    [dispatch, folder]
  )
  if (root) {
    return (
      <FolderSelectDialog
        title={{ value: 'Move To' }}
        open={open}
        root={root}
        targetFolder={folder}
        onClose={onClose}
        onSelect={handleSelect}
      />
    )
  }

  return <></>
}
