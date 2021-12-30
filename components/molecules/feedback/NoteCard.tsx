import { Note } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { OpenIcon } from '../../atoms/display/Icons'
import { useCallback, useContext } from 'react'
import { Router } from '../../systems/RouterProvider'
import NoteTitleLabel from '../display/NoteTitleLabel'
import DateTimeLabel from '../DateTimeLabel'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import Label from '../../atoms/display/Label'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const { go } = useContext(Router)
  const handleOpenNote = useCallback(() => {
    go(`/notes/${note.id}`)
  }, [go, note])

  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <IconButton onClick={handleOpenNote}>
          <OpenIcon />
        </IconButton>
      }
    >
      <FlexColumn>
        <FlexRow>
          <Label>作成日時</Label>
          <DateTimeLabel datetime={note.createdAt} />
        </FlexRow>
        <FlexRow>
          <Label>更新日時</Label>
          <DateTimeLabel datetime={note.updatedAt} />
        </FlexRow>
      </FlexColumn>
    </Card>
  )
}
