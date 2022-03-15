import Dialog from '../atoms/feedback/Dialog'
import { useFileUploadDialog } from '../../hooks/useDialogs'
import FileSelectField from '../molecules/inputs/FileSelectField'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import NotesActions from '../../store/notes/actions'
import { Folder } from '../../store/notes/models'

type FileUploadDialogProps = {
  folder: Folder
}

export default function FileUploadDialog({ folder }: FileUploadDialogProps) {
  const { state, close } = useFileUploadDialog()
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        dispatch(
          NotesActions.createFiles({
            file,
            parentFolder: folder,
          })
        )
      })
      close()
    },
    [dispatch, folder, close]
  )

  return (
    <Dialog open={state !== undefined} onClose={close}>
      <FileSelectField onSelect={handleSelect} />
    </Dialog>
  )
}
