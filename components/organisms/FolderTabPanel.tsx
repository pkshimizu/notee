import { Folder } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/feedback/FolderCard'
import NoteCard from '../molecules/feedback/NoteCard'
import Label from '../atoms/display/Label'
import Margin from '../atoms/layout/Margin'

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  return (
    <TabPanel value={folder.id}>
      <FlexColumn>
        <FolderMenu folder={folder} />
        <Margin left={2} right={2}>
          {folder.folders.length > 0 && (
            <>
              <Margin top={3} bottom={3}>
                <Label variant={'caption'}>フォルダ</Label>
              </Margin>
              <FlexRow>
                {folder.folders.map((folder) => (
                  <FolderCard folder={folder} key={folder.id} />
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
                  <NoteCard note={note} key={note.id} />
                ))}
              </FlexRow>
            </>
          )}
        </Margin>
      </FlexColumn>
    </TabPanel>
  )
}
