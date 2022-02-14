import { Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '../atoms/surfaces/AppBar'
import {
  CloseIcon,
  TrashIcon,
  FavoriteIcon,
  FavoriteOutlinedIcon,
  MoveIcon,
  SidebarIcon,
  UndoIcon,
  RedoIcon,
} from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteMoveToTrashDialog, useNoteMoveDialog } from '../../hooks/useDialogs'
import { favorite, unFavorite } from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import Divider from '../atoms/display/Divider'
import { useEditor } from '../../hooks/useEditor'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
}

export default function NoteMenu({ note, onOpenProperties }: NoteMenuProps) {
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const { undo, redo, canUndo, canRedo } = useEditor()
  const [undoDisabled, setUndoDisabled] = useState(false)
  const [redoDisabled, setRedoDisabled] = useState(false)
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
  useEffect(() => {
    setUndoDisabled(!canUndo(note.id))
    setRedoDisabled(!canRedo(note.id))
  }, [note, canUndo, canRedo])
  const handleUndo = useCallback(() => {
    undo(note.id)
  }, [note, undo])
  const handleRedo = useCallback(() => {
    redo(note.id)
  }, [note, redo])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={'Favorites'} color={'white'} onClick={handleFavorite}>
            {note.favorite ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
          </IconButton>
          <IconButton label={'Move note'} color={'white'} onClick={() => noteMoveDialog.open(note)}>
            <MoveIcon />
          </IconButton>
          <IconButton label={'Move note to trash'} color={'white'} onClick={() => noteMoveToTrashDialog.open(note)}>
            <TrashIcon />
          </IconButton>
          <Divider vertical />
          <IconButton label={'Undo'} color={'white'} disabled={undoDisabled} onClick={handleUndo}>
            <UndoIcon />
          </IconButton>
          <IconButton label={'Redo'} color={'white'} disabled={redoDisabled} onClick={handleRedo}>
            <RedoIcon />
          </IconButton>
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={'Open properties'} color={'white'} onClick={onOpenProperties}>
            <SidebarIcon />
          </IconButton>
          <IconButton label={'Close tab'} color={'white'} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
