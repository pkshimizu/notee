import { Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '../atoms/surfaces/AppBar'
import {
  TrashIcon,
  FavoriteIcon,
  FavoriteOutlinedIcon,
  MoveIcon,
  SidebarIcon,
  UndoIcon,
  RedoIcon,
  VerticalSplitIcon,
  PreviewIcon,
  SyncIcon,
  SyncDisabledIcon,
  FolderIcon,
} from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteMoveToTrashDialog, useNoteMoveDialog } from '../../hooks/useDialogs'
import NotesActions from '../../store/notes/actions'
import Divider from '../atoms/display/Divider'
import { useEditor } from '../../hooks/useEditor'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useFoldersPage } from '../../hooks/usePages'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
}

export default function NoteMenu({ note, onOpenProperties }: NoteMenuProps) {
  const foldersPage = useFoldersPage()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const { undo, redo, canUndo, canRedo, setPreview, setSyncScroll, syncScroll } = useEditor(note)
  const [undoDisabled, setUndoDisabled] = useState(false)
  const [redoDisabled, setRedoDisabled] = useState(false)
  const deviceType = useDeviceType()
  const dispatch = useDispatch()
  const handleFavorite = useCallback(() => {
    if (note.favorite) {
      dispatch(NotesActions.unFavorite({ note: note }))
    } else {
      dispatch(NotesActions.favorite({ note: note }))
    }
  }, [dispatch, note])
  const handleGoFolder = useCallback(async () => {
    await foldersPage(note.folderId)
  }, [foldersPage, note])
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
          <IconButton label={{ value: 'Favorites' }} color={'white'} onClick={handleFavorite}>
            {note.favorite ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
          </IconButton>
          <IconButton label={{ value: 'Folder' }} color={'white'} onClick={handleGoFolder}>
            <FolderIcon />
          </IconButton>
          <Divider vertical />
          <IconButton label={{ value: 'Move note' }} color={'white'} onClick={() => noteMoveDialog.open(note)}>
            <MoveIcon />
          </IconButton>
          <IconButton
            label={{ value: 'Move note to trash' }}
            color={'white'}
            onClick={() => noteMoveToTrashDialog.open(note)}
          >
            <TrashIcon />
          </IconButton>
          <Divider vertical />
          <IconButton label={{ value: 'Undo' }} color={'white'} disabled={undoDisabled} onClick={handleUndo}>
            <UndoIcon />
          </IconButton>
          <IconButton label={{ value: 'Redo' }} color={'white'} disabled={redoDisabled} onClick={handleRedo}>
            <RedoIcon />
          </IconButton>
          {note.contentType === 'markdown' && (
            <>
              <Divider vertical />
              {deviceType === 'PC' && (
                <IconButton label={{ value: 'Editor and Preview' }} color={'white'} onClick={() => setPreview('half')}>
                  <VerticalSplitIcon />
                </IconButton>
              )}
              <IconButton label={{ value: 'Preview' }} color={'white'} onClick={() => setPreview('full')}>
                <PreviewIcon />
              </IconButton>
              {syncScroll ? (
                <IconButton
                  label={{ value: 'Sync Disabled Scroll' }}
                  color={'white'}
                  onClick={() => setSyncScroll(false)}
                >
                  <SyncIcon />
                </IconButton>
              ) : (
                <IconButton label={{ value: 'Sync Scroll' }} color={'white'} onClick={() => setSyncScroll(true)}>
                  <SyncDisabledIcon />
                </IconButton>
              )}
            </>
          )}
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={{ value: 'Open properties' }} color={'white'} onClick={onOpenProperties}>
            <SidebarIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
