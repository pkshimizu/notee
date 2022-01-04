import { Note } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CloseIcon, DeleteIcon, SidebarIcon } from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
}

export default function NoteMenu({ note, onOpenProperties }: NoteMenuProps) {
  const noteDeleteDialog = useNoteDeleteDialog()
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: note.id }))
  }, [dispatch, note])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton onClick={() => noteDeleteDialog.open(note)}>
            <DeleteIcon color={'white'} />
          </IconButton>
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton onClick={onOpenProperties}>
            <SidebarIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
