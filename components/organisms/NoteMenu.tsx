import { deleteNote, Note } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CloseIcon, DeleteIcon } from '../atoms/display/Icons'
import NoteDeleteDialog from './NoteDeleteDialog'

type NoteMenuProps = {
  note: Note
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const [openDelete, setOpenDelete] = useState(false)
  const dispatch = useDispatch()
  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true)
  }, [])
  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false)
  }, [])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: note.id }))
  }, [dispatch, note])

  return (
    <AppBar>
      <Flex direction={'row'} justify={'space-around'}>
        <Flex direction={'row'}>
          <IconButton onClick={handleOpenDelete}>
            <DeleteIcon color={'white'} />
          </IconButton>
          <NoteDeleteDialog open={openDelete} note={note} onClose={handleCloseDelete} />
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
