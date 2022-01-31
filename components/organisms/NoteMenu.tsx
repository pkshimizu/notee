import { Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '../atoms/surfaces/AppBar'
import { CloseIcon, TrashIcon, FavoriteIcon, FavoriteOutlinedIcon, MoveIcon, SidebarIcon } from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteMoveToTrashDialog, useNoteMoveDialog } from '../../hooks/useDialogs'
import { favorite, unFavorite } from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
}

export default function NoteMenu({ note, onOpenProperties }: NoteMenuProps) {
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const { close } = useWorkspaceTab()
  const dispatch = useDispatch()
  const handleFavorite = useCallback(() => {
    if (note.favorite) {
      dispatch(unFavorite({ note: note }))
    } else {
      dispatch(favorite({ note: note }))
    }
  }, [dispatch, note])
  const handleClose = useCallback(() => {
    close(note.id)
  }, [close, note])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={'favorite'} onClick={handleFavorite}>
            {note.favorite ? <FavoriteIcon color={'white'} /> : <FavoriteOutlinedIcon color={'white'} />}
          </IconButton>
          <IconButton label={'move note'} onClick={() => noteMoveDialog.open(note)}>
            <MoveIcon color={'white'} />
          </IconButton>
          <IconButton label={'move note to trash'} onClick={() => noteMoveToTrashDialog.open(note)}>
            <TrashIcon color={'white'} />
          </IconButton>
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={'open properties'} onClick={onOpenProperties}>
            <SidebarIcon color={'white'} />
          </IconButton>
          <IconButton label={'close tab'} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
