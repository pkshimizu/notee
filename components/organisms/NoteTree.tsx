import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import { FolderIcon, NoteIcon } from '../atoms/display/Icons'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { Folder, Note } from '../../store/notes/models'
import { useCallback, useState } from 'react'

type NoteTreeProps = {
  folder?: Folder
  activeId?: string
  folderOnly?: boolean
  expandedIds?: string[]
  onSelect: (_id: string) => void
  onChangeExpanded?: (_expanded: string[]) => void
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

export default function NoteTree({
  folder,
  activeId,
  folderOnly = false,
  expandedIds = [],
  onSelect,
  onChangeExpanded,
}: NoteTreeProps) {
  const [expanded, setExpanded] = useState(expandedIds)
  const handleSelect = useCallback(
    (id) => {
      onSelect(id)
      if (id === activeId) {
        if (expanded.includes(id)) {
          setExpanded(expanded.filter((expandedId) => expandedId !== id))
        } else {
          setExpanded(expanded.concat(id))
        }
        if (onChangeExpanded) {
          onChangeExpanded(expanded)
        }
      }
    },
    [onSelect, activeId, expanded, setExpanded, onChangeExpanded]
  )

  return (
    <TreeView selectedId={activeId} expanded={expanded} onSelect={handleSelect}>
      {folder && <NoteTreeFolderItem folder={folder} folderOnly={folderOnly} />}
    </TreeView>
  )
}
