import { deleteNote, Note } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CloseIcon, DeleteIcon } from '../atoms/display/Icons'
import NoteDeleteDialog from './NoteDeleteDialog'
import { FlexRow } from '../atoms/layout/Flex'

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
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton onClick={handleOpenDelete}>
            <DeleteIcon color={'white'} />
          </IconButton>
          <NoteDeleteDialog open={openDelete} note={note} onClose={handleCloseDelete} />
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
