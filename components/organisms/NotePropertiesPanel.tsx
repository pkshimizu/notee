import TabView from '../atoms/navigation/TabView'
import { InfoIcon, LogIcon, TrashIcon } from '../atoms/display/Icons'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import DateTimeLabel from '../molecules/display/DateTimeLabel'
import { Note, NoteLog } from '../../store/notes/models'
import { useCallback, useState } from 'react'
import List from '../atoms/display/List'
import ListItem from '../atoms/display/ListItem'
import { useNoteLogDialog } from '../../hooks/useDialogs'
import ContentTypeSelect from '../molecules/inputs/ContentTypeSelect'
import { ContentType } from '../atoms/inputs/TextEditor'
import { useDispatch } from 'react-redux'
import NotesActions from '../../store/notes/actions'
import FontSizeSelect from '../molecules/inputs/FontSizeSelect'
import { useEditor } from '../../hooks/useEditor'
import editorsSlice from '../../store/editors'
import FromNowLabel from '../molecules/display/FromNowLabel'
import Button from '../atoms/inputs/Button'

type NotePropertiesPanelProps = {
  note: Note
}

export default function NotePropertiesPanel({ note }: NotePropertiesPanelProps) {
  const { fontSize, setFontSize } = useEditor(note)
  const [tab, setTab] = useState('info')
  const noteLogDialog = useNoteLogDialog()
  const dispatch = useDispatch()
  const handleSelectLog = useCallback(
    (log: NoteLog) => {
      noteLogDialog.open(note, log)
    },
    [noteLogDialog, note]
  )
  const handleChangeContentType = useCallback(
    (value: ContentType) => {
      dispatch(NotesActions.updateNote({ note: note, contentType: value }))
      if (value !== 'markdown') {
        dispatch(editorsSlice.actions.updatePreview({ id: note.id, size: 'none' }))
      }
    },
    [dispatch, note]
  )
  const handleClearLogs = useCallback(() => {
    dispatch(NotesActions.clearLogs({ note }))
  }, [dispatch, note])

  return (
    <TabView
      value={tab}
      tabs={[
        {
          value: 'info',
          icon: <InfoIcon />,
          panel: (
            <FlexColumn space={2} py={2} px={1}>
              <FlexColumn space={0}>
                <Label variant={'caption'} text={{ value: 'Created Date' }} />
                <DateTimeLabel datetime={note.createdAt} />
              </FlexColumn>
              <FlexColumn space={0}>
                <Label variant={'caption'} text={{ value: 'Last Updated Date' }} />
                <DateTimeLabel datetime={note.updatedAt} />
              </FlexColumn>
              <ContentTypeSelect value={note.contentType} onChange={handleChangeContentType} />
              <FontSizeSelect value={fontSize} onChange={setFontSize} />
            </FlexColumn>
          ),
        },
        {
          value: 'log',
          icon: <LogIcon />,
          panel: (
            <FlexColumn>
              <Button onClick={handleClearLogs} icon={<TrashIcon />} variant={'text'}>
                <Label text={{ value: 'Clear logs' }} />
              </Button>
              <List>
                {[...note.logs].reverse().map((log) => (
                  <ListItem key={log.id} onClick={() => handleSelectLog(log)}>
                    <FlexRow align={'center'}>
                      <DateTimeLabel datetime={log.updatedAt} />
                      <FromNowLabel datetime={log.updatedAt} variant={'caption'} />
                    </FlexRow>
                  </ListItem>
                ))}
              </List>
            </FlexColumn>
          ),
        },
      ]}
      variant={'fullWidth'}
      onChange={(value) => setTab(value)}
    />
  )
}
