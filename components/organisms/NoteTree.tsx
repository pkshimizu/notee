import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import FolderIcon from '../atoms/display/icons/FolderIcon'
import NoteIcon from '../atoms/display/icons/NoteIcon'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useCallback } from 'react'
import { Folder, Note } from '../../store/notes'

type NoteTreeProps = {
  folder: Folder
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
  const handleSelectTab = useCallback((value: string) => {}, [])

  return (
    <TreeView onSelect={handleSelectTab}>
      <NoteTreeFolderItem folder={folder} />
    </TreeView>
  )
}
