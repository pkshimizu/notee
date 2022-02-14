import { Folder } from '../../../store/notes/models'
import { useCallback, useState } from 'react'
import NoteTree from '../../organisms/NoteTree'
import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Button from '../../atoms/inputs/Button'
import Label from '../../atoms/display/Label'

type FolderSelectDialogProps = {
  open: boolean
  root: Folder
  targetFolder?: Folder
  title?: string
  okLabel?: string
  closeLabel?: string
  width?: DialogWidth
  onClose: () => void
  onSelect: (_folderId: string) => void
}

const selectable = (folder: Folder, selectedId: string): boolean => {
  if (folder.id === selectedId) {
    return false
  }

  return folder.folders.every((subFolder) => selectable(subFolder, selectedId))
}

export default function FolderSelectDialog({
  open,
  root,
  targetFolder,
  title,
  okLabel = 'Select',
  closeLabel = 'Close',
  width,
  onClose,
  onSelect,
}: FolderSelectDialogProps) {
  const [folderId, setFolderId] = useState<string | undefined>(undefined)
  const handleOk = useCallback(() => {
    if (folderId) {
      onSelect(folderId)
    }
    onClose()
  }, [folderId, onSelect, onClose])
  const handleSelect = useCallback(
    (selectedFolderId: string) => {
      if (!targetFolder || selectable(targetFolder, selectedFolderId)) {
        setFolderId(selectedFolderId)
      } else {
        setFolderId(undefined)
      }
    },
    [setFolderId, targetFolder]
  )

  return (
    <Dialog
      open={open}
      title={<Label text={title} />}
      width={width}
      actions={
        <>
          <Button variant={'text'} onClick={onClose}>
            <Label text={closeLabel} />
          </Button>
          <Button variant={'text'} disabled={folderId === undefined} onClick={handleOk}>
            <Label text={okLabel} />
          </Button>
        </>
      }
      onClose={onClose}
    >
      <NoteTree folder={root} activeId={folderId} folderOnly onSelect={handleSelect} />
    </Dialog>
  )
}
