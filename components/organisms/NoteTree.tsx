import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import FolderIcon from '../atoms/display/icons/FolderIcon'
import NoteIcon from '../atoms/display/icons/NoteIcon'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useCallback } from 'react'
import { Folder, foldersSelector, Note, notesSelector } from '../../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice from '../../store/workspace'

type NoteTreeProps = {
  folder?: Folder
}

function NoteTreeNoteItem({ note }: { note: Note }) {
  return <TreeItem id={note.id} label={<NoteTitleLabel note={note} />} icon={<NoteIcon />} />
}

function NoteTreeFolderItem({ folder }: { folder: Folder }) {
  return (
    <TreeItem id={folder.id} label={folder.name} icon={<FolderIcon />}>
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
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const dispatch = useDispatch()
  const handleSelectTab = useCallback(
    (value: string) => {
      const folder = folders.find((folder) => folder.id === value)
      if (folder) {
        dispatch(workspaceSlice.actions.openFolder(folder))

        return
      }
      const note = notes.find((note) => note.id === value)
      if (note) {
        dispatch(workspaceSlice.actions.openNote(note))

        return
      }
    },
    [folders, notes, dispatch]
  )

  return <TreeView onSelect={handleSelectTab}>{folder && <NoteTreeFolderItem folder={folder} />}</TreeView>
}
