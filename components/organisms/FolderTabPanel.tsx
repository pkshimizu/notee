import { Folder } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import {FlexColumn, FlexRow} from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/feedback/FolderCard'
import NoteCard from '../molecules/feedback/NoteCard'
import Label from "../atoms/display/Label";

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  return (
    <TabPanel value={folder.id}>
      <FlexColumn>
        <FolderMenu folder={folder} />
        <Label variant={'caption'}>フォルダ</Label>
        <FlexRow>
          {folder.folders.map((folder) => (
            <FolderCard folder={folder} />
          ))}
        </FlexRow>
        <Label variant={'caption'}>ノート</Label>
        <FlexRow>
          {folder.notes.map((note) => (
            <NoteCard note={note} />
          ))}
        </FlexRow>
      </FlexColumn>
    </TabPanel>
  )
}
