import { Folder } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import FolderCard from '../molecules/feedback/FolderCard'
import NoteCard from '../molecules/feedback/NoteCard'
import Label from '../atoms/display/Label'
import Margin from '../atoms/layout/Margin'
import RelativeBox from "../atoms/layout/RelativeBox";
import AbsoluteBox from "../atoms/layout/AbsoluteBox";

type FolderTabPanelProps = {
  folder: Folder
}

export default function FolderTabPanel({ folder }: FolderTabPanelProps) {
  return (
    <TabPanel value={folder.id}>
      <FlexColumn space={0} height={'100%'}>
        <FolderMenu folder={folder} />
        <FlexRow>
          <RelativeBox width={'100%'} height={'100%'}>
            <AbsoluteBox top={0} bottom={0} left={0} right={0}>
              <Margin left={2} right={2} bottom={4}>
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
            </AbsoluteBox>
          </RelativeBox>
        </FlexRow>
      </FlexColumn>
    </TabPanel>
  )
}
