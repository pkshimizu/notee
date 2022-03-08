import Dialog from '../atoms/feedback/Dialog'
import FileSelect from '../atoms/inputs/FileSelect'
import { useFileUploadDialog } from '../../hooks/useDialogs'

export default function FileUploadDialog() {
  const { state, close } = useFileUploadDialog()

  return (
    <Dialog open={state !== undefined} onClose={close}>
      <FileSelect />
    </Dialog>
  )
}
