import { Folder, Note } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import CloseIcon from '../atoms/display/icons/CloseIcon'

type NoteMenuProps = {
  note: Note
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close(note.id))
  }, [dispatch, note])

  return (
    <Flex direction={'row'}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Flex>
  )
}
