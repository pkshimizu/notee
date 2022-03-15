import FolderSelectDialog from '../molecules/feedback/FolderSelectDialog'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import NotesActions from '../../store/notes/actions'
import NotesSelectors from '../../store/notes/selectors'
import { useFileMoveDialog } from '../../hooks/useDialogs'
import { File } from '../../store/notes/models'

type FileMoveDialogProps = {
  file: File
}

export default function FileMoveDialog({ file }: FileMoveDialogProps) {
  const { state, close } = useFileMoveDialog()
  const root = useSelector(NotesSelectors.rootFolder)
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(NotesActions.updateFile({ file: file, folderId: id }))
    },
    [dispatch, file]
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
