import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useFolderMoveDialog } from '../../hooks/useDialogs'
import { Folder } from '../../store/notes/models'

type FolderMoveDialogProps = {
  folder: Folder
}

export default function FolderMoveDialog({ folder }: FolderMoveDialogProps) {
  const { state, close } = useFolderMoveDialog()
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(NotesActions.updateFolder({ folder: folder, folderId: id }))
    },
    [dispatch, folder]
  )
  if (root) {
    return (
      <FolderSelectDialog
        title={{ value: 'Move To' }}
        open={state !== undefined}
        root={root}
        targetFolder={folder}
        onClose={close}
        onSelect={handleSelect}
      />
    )
  }

  return <></>
}
