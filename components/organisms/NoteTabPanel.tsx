import { Note, updateNote } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NoteMenu from './NoteMenu'
import TextEditor from '../atoms/inputs/TextEditor'
import RelativeBox from '../atoms/layout/RelativeBox'
import AbsoluteBox from '../atoms/layout/AbsoluteBox'
import { useCallback, useState } from 'react'
import { Ace } from 'ace-builds'
import { useDispatch } from 'react-redux'

type NoteTabPanelProps = {
  note: Note
}

export default function NoteTabPanel({ note }: NoteTabPanelProps) {
  const [editor, setEditor] = useState<Ace.Editor | undefined>(undefined)
  const dispatch = useDispatch()
  const handleLoad = useCallback((editor) => {
    setEditor(editor)
  }, [])
  const handleResize = useCallback(() => {
    if (editor) {
      editor.resize()
    }
  }, [editor])
  const handleChangeContent = useCallback(
    (content: string) => {
      dispatch(updateNote({ note, content }))
    },
    [dispatch, note]
  )

  return (
    <TabPanel value={note.id}>
      <FlexColumn space={0} height={'100%'}>
        <NoteMenu note={note} />
        <FlexRow>
          <RelativeBox width={'100%'} height={'100%'}>
            <AbsoluteBox top={0} bottom={0} left={0} right={0} onResize={handleResize}>
              <TextEditor content={note.content} onLoad={handleLoad} onChangeContent={handleChangeContent} />
            </AbsoluteBox>
          </RelativeBox>
        </FlexRow>
      </FlexColumn>
    </TabPanel>
  )
}
