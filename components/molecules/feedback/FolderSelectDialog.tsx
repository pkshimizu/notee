import { Folder } from '../../../store/notes'
import { useCallback, useState } from 'react'
import NoteTree from '../../organisms/NoteTree'
import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Button from '../../atoms/inputs/Button'

type FolderSelectDialog = {
  open: boolean
  root: Folder
  title?: string
  okLabel?: string
  closeLabel?: string
  width?: DialogWidth
  onClose: () => void
  onSelect: (folderId: string) => void
}

export default function FolderSelectDialog({
  open,
  root,
  title,
  okLabel = 'Select',
  closeLabel = 'Close',
  width,
  onClose,
  onSelect,
}: FolderSelectDialog) {
  const [folderId, setFolderId] = useState<string | undefined>(undefined)
  const handleOk = useCallback(() => {
    if (folderId) {
      onSelect(folderId)
    }
    onClose()
  }, [folderId, onSelect, onClose])

  return (
    <Dialog
      open={open}
      title={title}
      width={width}
      actions={
        <>
          <Button variant={'text'} onClick={onClose}>
            {closeLabel}
          </Button>
          <Button variant={'text'} onClick={handleOk}>
            {okLabel}
          </Button>
        </>
      }
      onClose={onClose}
    >
      <NoteTree folder={root} folderOnly onSelect={(selectedFolderId) => setFolderId(selectedFolderId)} />
    </Dialog>
  )
}
