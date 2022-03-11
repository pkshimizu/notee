import Dialog from '../atoms/feedback/Dialog'
import { useFileUploadDialog } from '../../hooks/useDialogs'
import FileSelectField from '../molecules/inputs/FileSelectField'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import NotesActions from '../../store/notes/actions'

export default function FileUploadDialog() {
  const { state, close } = useFileUploadDialog()
  const dispatch = useDispatch()
  const handleSelect = useCallback(
    (files: File[]) => {
      if (state) {
        files.forEach((file) => {
          dispatch(
            NotesActions.createFiles({
              file,
              parentFolder: state.folder,
            })
          )
        })
      }
    },
    [dispatch, state]
  )

  return (
    <Dialog open={state !== undefined} onClose={close}>
      <FileSelectField onSelect={handleSelect} />
    </Dialog>
  )
}
