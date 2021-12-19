import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import FolderIcon from '../atoms/display/icons/FolderIcon'
import NoteIcon from '../atoms/display/icons/NoteIcon'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useCallback } from 'react'
import workspaceSlice from '../../store/workspace'
import { Folder, Note } from '../../store/notes'
import { useDispatch } from 'react-redux'

type NoteTreeProps = {
  folder: Folder
}

function NoteTreeNoteItem({ note }: { note: Note }) {
  const dispatch = useDispatch()
  const selectNote = useCallback(() => {
    dispatch(workspaceSlice.actions.addNote(note))
  }, [dispatch, note])

  return <TreeItem id={note.id} label={<NoteTitleLabel note={note} />} icon={<NoteIcon />} onClick={selectNote} />
}

function NoteTreeFolderItem({ folder }: { folder: Folder }) {
  const dispatch = useDispatch()
  const selectFolder = useCallback(() => {
    dispatch(workspaceSlice.actions.addFolder(folder))
  }, [dispatch, folder])

  return (
    <TreeItem id={folder.id} label={folder.name} icon={<FolderIcon />} onClick={selectFolder}>
      {folder.folders.map((subFolder) => (
        <NoteTreeFolderItem key={subFolder.id} folder={subFolder} />
      ))}
      {folder.notes.map((note) => (
        <NoteTreeNoteItem key={note.id} note={note} />
      ))}
    </TreeItem>
  )
}

export default function NoteTree({ folder }: NoteTreeProps) {
  return (
    <TreeView>
      <NoteTreeFolderItem folder={folder} />
    </TreeView>
  )
}
