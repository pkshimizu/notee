import { Folder } from '../../store/notes/models'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import Label from '../atoms/display/Label'
import { useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import { useState } from 'react'
import FolderPropertiesPanel from './FolderPropertiesPanel'
import { useSelector } from 'react-redux'
import FolderBreadcrumbs from '../molecules/navigation/FolderBreadcrumbs'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { foldersSelector } from '../../store/notes/selectors'

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()
  const folders = useSelector(foldersSelector)

  return (
    <WorkspaceTabPanel
      menu={<FolderMenu folder={folder} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={propertiesPanel ? <FolderPropertiesPanel folder={folder} /> : undefined}
    >
      <FlexColumn pl={2} pr={2} pb={4}>
        <FolderBreadcrumbs folders={folders} folder={folder} />
        {folder.folders.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>フォルダ</Label>
            </FlexRow>
            <FlexRow>
              {folder.folders.map((folder) => (
                <FolderCard
                  folder={folder}
                  key={folder.id}
                  onClickFolderLink={() => openFolderPage(folder.id)}
                  onClickDelete={() => folderDeleteDialog.open(folder)}
                />
              ))}
            </FlexRow>
          </>
        )}
        {folder.notes.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>ノート</Label>
            </FlexRow>
            <FlexRow>
              {folder.notes.map((note) => (
                <NoteCard
                  note={note}
                  key={note.id}
                  onClickNoteLink={() => openNotePage(note.id)}
                  onClickDelete={() => noteDeleteDialog.open(note)}
                />
              ))}
            </FlexRow>
          </>
        )}
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
