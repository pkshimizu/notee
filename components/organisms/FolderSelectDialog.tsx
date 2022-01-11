import { Folder } from '../../store/notes'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback, useState } from 'react'
import NoteTree from './NoteTree'

type FolderSelectDialog = {
  open: boolean
  root: Folder
  onClose: () => void
  onSelect: (folderId: string) => void
}

export default function FolderSelectDialog({ open, root, onClose, onSelect }: FolderSelectDialog) {
  const [folderId, setFolderId] = useState<string | undefined>(undefined)
  const handleOk = useCallback(() => {
    if (folderId) {
      onSelect(folderId)
    }
    onClose()
  }, [folderId, onSelect, onClose])
  
  return (
    <ConfirmDialog open={open} onOk={handleOk} onCancel={onClose}>
      <NoteTree folder={root} folderOnly onSelect={(selectedFolderId) => setFolderId(selectedFolderId)} />
    </ConfirmDialog>
  )
}
