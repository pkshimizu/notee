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
  onClickNoteLink?: (_note: Note) => void
  onClickMoveToTrash?: (_note: Note) => void
  onClickRestore?: (_note: Note) => void
  onClickDelete?: (_note: Note) => void
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
            <IconButton label={'Open note'} onClick={() => onClickNoteLink(note)}>
              <OpenIcon />
            </IconButton>
          )}
          {onClickMoveToTrash && (
            <IconButton label={'Move note to trash'} onClick={() => onClickMoveToTrash(note)}>
              <TrashIcon />
            </IconButton>
          )}
          {onClickRestore && (
            <IconButton label={'Restore note'} onClick={() => onClickRestore(note)}>
              <RestoreIcon />
            </IconButton>
          )}
          {onClickDelete && (
            <IconButton label={'Delete note'} onClick={() => onClickDelete(note)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <FlexColumn>
        <FlexRow>
          <Label text={'Created Date'} />
          <DateTimeLabel datetime={note.createdAt} />
        </FlexRow>
        <FlexRow>
          <Label text={'Updated Date'} />
          <DateTimeLabel datetime={note.updatedAt} />
        </FlexRow>
      </FlexColumn>
    </Card>
  )
}
