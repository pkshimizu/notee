import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import { useCallback } from 'react'
import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon, DeleteIcon } from '../atoms/display/Icons'
import { useSelector } from 'react-redux'
import { trashFoldersSelector, trashNotesSelector } from '../../store/notes/selectors'
import { useTrashEmptyDialog } from '../../hooks/useDialogs'

type TrashMenuProps = {}

export default function TrashMenu({}: TrashMenuProps) {
  const folders = useSelector(trashFoldersSelector)
  const notes = useSelector(trashNotesSelector)
  const trashEmptyDialog = useTrashEmptyDialog()
  const { closeTrash } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeTrash()
  }, [closeTrash])

  return (
    <AppBar>
      <FlexRow justify={'space-between'}>
        <IconButton onClick={trashEmptyDialog.open} disabled={folders.length === 0 && notes.length === 0}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
