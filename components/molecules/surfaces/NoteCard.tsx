import { Note } from '../../../store/notes/models'
import Card from '../../atoms/surfaces/Card'
import IconButton from '../../atoms/inputs/IconButton'
import { TrashIcon, OpenIcon, RestoreIcon, DeleteIcon } from '../../atoms/display/Icons'
import NoteTitleLabel from '../display/NoteTitleLabel'
import DateTimeLabel from '../display/DateTimeLabel'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import Label from '../../atoms/display/Label'

type NoteCardProps = {
  note: Note
  onClickNoteLink?: (note: Note) => void
  onClickMoveToTrash?: (note: Note) => void
  onClickRestore?: (note: Note) => void
  onClickDelete?: (note: Note) => void
}

export default function NoteCard({
  note,
  onClickNoteLink,
  onClickMoveToTrash,
  onClickRestore,
  onClickDelete,
}: NoteCardProps) {
  return (
    <Card
      header={<NoteTitleLabel note={note} />}
      actions={
        <>
          {onClickNoteLink && (
            <IconButton onClick={() => onClickNoteLink(note)}>
              <OpenIcon />
            </IconButton>
          )}
          {onClickMoveToTrash && (
            <IconButton onClick={() => onClickMoveToTrash(note)}>
              <TrashIcon />
            </IconButton>
          )}
          {onClickRestore && (
            <IconButton onClick={() => onClickRestore(note)}>
              <RestoreIcon />
            </IconButton>
          )}
          {onClickDelete && (
            <IconButton onClick={() => onClickDelete(note)}>
              <DeleteIcon />
            </IconButton>
          )}
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
