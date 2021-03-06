import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import { useCallback } from 'react'
import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon, DeleteIcon } from '../atoms/display/Icons'
import { useSelector } from 'react-redux'
import { useTrashEmptyDialog } from '../../hooks/useDialogs'
import NotesSelectors from '../../store/notes/selectors'

type TrashMenuProps = {}

export default function TrashMenu({}: TrashMenuProps) {
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const trashEmptyDialog = useTrashEmptyDialog()
  const { closeTrash } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeTrash()
  }, [closeTrash])

  return (
    <AppBar>
      <FlexRow justify={'space-between'}>
        <IconButton
          label={{ value: 'Empty trash' }}
          color={'white'}
          onClick={trashEmptyDialog.open}
          disabled={folders.length === 0 && notes.length === 0}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton label={{ value: 'Close tab' }} color={'white'} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
