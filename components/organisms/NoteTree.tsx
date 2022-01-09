import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import { FolderIcon, NoteIcon } from '../atoms/display/Icons'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { Folder, Note } from '../../store/notes'

type NoteTreeProps = {
  folder?: Folder
  activeId?: string
  onSelect: (id: string) => void
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

export default function NoteTree({ folder, activeId, onSelect }: NoteTreeProps) {
  return (
    <TreeView selectedId={activeId} onSelect={onSelect}>
      {folder && <NoteTreeFolderItem folder={folder} />}
    </TreeView>
  )
}
