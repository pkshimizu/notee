import { Folder } from '../../store/notes/models'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import Label from '../atoms/display/Label'
import { useFolderMoveToTrashDialog, useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import { useState } from 'react'
import FolderPropertiesPanel from './FolderPropertiesPanel'
import { useSelector } from 'react-redux'
import FolderBreadcrumbs from '../molecules/navigation/FolderBreadcrumbs'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import NotesSelectors from '../../store/notes/selectors'

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()
  const folders = useSelector(NotesSelectors.folders)

  return (
    <WorkspaceTabPanel
      menu={<FolderMenu folder={folder} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={propertiesPanel ? <FolderPropertiesPanel folder={folder} /> : undefined}
      onClosePropertiesPanel={() => setPropertiesPanel(false)}
    >
      <FlexColumn px={2} pb={4}>
        <FolderBreadcrumbs folders={folders} folder={folder} />
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Folder' }} />
        </FlexRow>
        <FlexRow>
          {folder.folders.map((folder) => (
            <FolderCard
              folder={folder}
              key={folder.id}
              onClickFolderLink={() => openFolderPage(folder.id)}
              onClickMoveToTrash={folderMoveToTrashDialog.open}
            />
          ))}
        </FlexRow>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Note' }} />
        </FlexRow>
        <FlexRow>
          {folder.notes.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onClickNoteLink={() => openNotePage(note.id)}
              onClickMoveToTrash={noteMoveToTrashDialog.open}
            />
          ))}
        </FlexRow>
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
