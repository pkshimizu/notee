import TabView from '../atoms/navigation/TabView'
import { InfoIcon, LogIcon } from '../atoms/display/Icons'
import { FlexColumn } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import DateTimeLabel from '../molecules/display/DateTimeLabel'
import { Note, NoteLog } from '../../store/notes/models'
import { useCallback, useState } from 'react'
import List from '../atoms/display/List'
import ListItem from '../atoms/display/ListItem'
import { useNoteLogDialog } from '../../hooks/useDialogs'

type NotePropertiesPanelProps = {
  note: Note
}

export default function NotePropertiesPanel({ note }: NotePropertiesPanelProps) {
  const [tab, setTab] = useState('info')
  const noteLogDialog = useNoteLogDialog()
  const handleSelectLog = useCallback(
    (log: NoteLog) => {
      noteLogDialog.open(note, log)
    },
    [noteLogDialog, note]
  )

  return (
    <TabView
      value={tab}
      tabs={[
        {
          value: 'info',
          icon: <InfoIcon />,
          panel: (
            <FlexColumn>
              <FlexColumn space={0}>
                <Label variant={'caption'}>作成日時</Label>
                <DateTimeLabel datetime={note.createdAt} />
              </FlexColumn>
              <FlexColumn space={0}>
                <Label variant={'caption'}>最終更新日時</Label>
                <DateTimeLabel datetime={note.updatedAt} />
              </FlexColumn>
            </FlexColumn>
          ),
        },
        {
          value: 'log',
          icon: <LogIcon />,
          panel: (
            <List>
              {[...note.logs].reverse().map((log) => (
                <ListItem
                  key={log.id}
                  label={<DateTimeLabel datetime={log.updatedAt} />}
                  onClick={() => handleSelectLog(log)}
                />
              ))}
            </List>
          ),
        },
      ]}
      variant={'fullWidth'}
      onChange={(value) => setTab(value)}
    />
  )
}
