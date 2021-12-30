import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import { FolderIcon, NoteIcon } from '../atoms/display/Icons'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useCallback, useContext } from 'react'
import { Folder, Note } from '../../store/notes'
import { Router } from '../systems/RouterProvider'
import { useSelector } from 'react-redux'
import { activeTabSelector } from '../../store/workspace'

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
  const { go } = useContext(Router)
  const activeTab = useSelector(activeTabSelector)
  const handleSelectTab = useCallback(
    (value: string) => {
      go(`/notes/${value}`)
    },
    [go]
  )

  return (
    <TreeView selectedId={activeTab?.value} onSelect={handleSelectTab}>
      {folder && <NoteTreeFolderItem folder={folder} />}
    </TreeView>
  )
}
