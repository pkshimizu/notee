import Dialog from '../atoms/feedback/Dialog'
import { useFileUploadDialog } from '../../hooks/useDialogs'
import FileSelectField from '../molecules/inputs/FileSelectField'
import { useCallback } from 'react'

export default function FileUploadDialog() {
  const { state, close } = useFileUploadDialog()
  const handleSelect = useCallback((_files: File[]) => {}, [])

  return (
    <Dialog open={state !== undefined} onClose={close}>
      <FileSelectField onSelect={handleSelect} />
    </Dialog>
  )
}
