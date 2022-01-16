import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import { FolderIcon, NoteIcon } from '../atoms/display/Icons'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { Folder, Note } from '../../store/notes'

type NoteTreeProps = {
  folder?: Folder
  activeId?: string
  folderOnly?: boolean
  onSelect: (_id: string) => void
}

function NoteTreeNoteItem({ note }: { note: Note }) {
  return <TreeItem id={note.id} label={<NoteTitleLabel note={note} />} icon={<NoteIcon />} />
}

function NoteTreeFolderItem({ folder, folderOnly }: { folder: Folder; folderOnly: boolean }) {
  return (
    <TreeItem id={folder.id} label={folder.name} icon={<FolderIcon />}>
      {folder.folders.map((subFolder) => (
        <NoteTreeFolderItem key={subFolder.id} folder={subFolder} folderOnly={folderOnly} />
      ))}
      {!folderOnly && folder.notes.map((note) => <NoteTreeNoteItem key={note.id} note={note} />)}
    </TreeItem>
  )
}

export default function NoteTree({ folder, activeId, folderOnly = false, onSelect }: NoteTreeProps) {
  return (
    <TreeView selectedId={activeId} onSelect={onSelect}>
      {folder && <NoteTreeFolderItem folder={folder} folderOnly={folderOnly} />}
    </TreeView>
  )
}
