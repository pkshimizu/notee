import { deleteNote, Note } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import CloseIcon from '../atoms/display/icons/CloseIcon'
import AppBar from '../atoms/surfaces/AppBar'
import DeleteIcon from '../atoms/display/icons/DeleteIcon'

type NoteMenuProps = {
  note: Note
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const dispatch = useDispatch()
  const handleDeleteNote = useCallback(() => {
    dispatch(deleteNote({ note: note }))
  }, [dispatch, note])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: note.id }))
  }, [dispatch, note])

  return (
    <AppBar>
      <Flex direction={'row'} justify={'space-around'}>
        <Flex direction={'row'}>
          <IconButton onClick={handleDeleteNote}>
            <DeleteIcon />
          </IconButton>
        </Flex>
        <Flex direction={'row'} justify={'flex-end'}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Flex>
      </Flex>
    </AppBar>
  )
}
