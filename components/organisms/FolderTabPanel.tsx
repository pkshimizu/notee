import { Folder, foldersSelector } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import Label from '../atoms/display/Label'
import Margin from '../atoms/layout/Margin'
import RelativeBox from '../atoms/layout/RelativeBox'
import AbsoluteBox from '../atoms/layout/AbsoluteBox'
import { useFolderDeleteDialog, useFolderCreateDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import { useNotesPage } from '../../hooks/usePages'
import { useState } from 'react'
import FolderPropertiesPanel from './FolderPropertiesPanel'
import { useSelector } from 'react-redux'
import FolderBreadcrumbs from '../molecules/navigation/FolderBreadcrumbs'

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const folderDeleteDialog = useFolderDeleteDialog()
  const folderSettingsDialog = useFolderCreateDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const openNotePage = useNotesPage()
  const folders = useSelector(foldersSelector)

  return (
    <TabPanel value={folder.id}>
      <FlexColumn space={0} height={'100%'}>
        <FolderMenu folder={folder} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />
        <FlexRow>
          <RelativeBox width={'100%'} height={'100%'}>
            <AbsoluteBox top={0} bottom={0} left={0} right={propertiesPanel ? 256 : 0}>
              <Margin left={2} right={2} bottom={4}>
                <FolderBreadcrumbs folders={folders} folder={folder} />
                {folder.folders.length > 0 && (
                  <>
                    <Margin top={3} bottom={3}>
                      <Label variant={'caption'}>フォルダ</Label>
                    </Margin>
                    <FlexRow>
                      {folder.folders.map((folder) => (
                        <FolderCard
                          folder={folder}
                          key={folder.id}
                          onClickFolderLink={() => openNotePage(folder.id)}
                          onClickSettings={() => folderSettingsDialog.open(folder)}
                          onClickDelete={() => folderDeleteDialog.open(folder)}
                        />
                      ))}
                    </FlexRow>
                  </>
                )}
                {folder.notes.length > 0 && (
                  <>
                    <Margin top={3} bottom={3}>
                      <Label variant={'caption'}>ノート</Label>
                    </Margin>
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
              </Margin>
            </AbsoluteBox>
            <AbsoluteBox top={0} bottom={0} left={propertiesPanel ? 'calc(100% - 256px)' : '100%'} right={0}>
              <FolderPropertiesPanel folder={folder} />
            </AbsoluteBox>
          </RelativeBox>
        </FlexRow>
      </FlexColumn>
    </TabPanel>
  )
}
