import { Note } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { DeleteIcon, OpenIcon } from '../../atoms/display/Icons'
import NoteTitleLabel from '../display/NoteTitleLabel'
import DateTimeLabel from '../display/DateTimeLabel'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import Label from '../../atoms/display/Label'

type NoteCardProps = {
  note: Note
  onClickNoteLink: () => void
  onClickDelete: () => void
}

export default function NoteCard({ note, onClickNoteLink, onClickDelete }: NoteCardProps) {
  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <>
          <IconButton onClick={onClickNoteLink}>
            <OpenIcon />
          </IconButton>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </>
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
