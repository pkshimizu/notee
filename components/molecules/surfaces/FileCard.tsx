import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import CapacityLabel from '../display/CapacityLabel'
import DateTimeLabel from '../display/DateTimeLabel'
import { FileMeta } from '../../../store/notes/models'
import Link from '../../atoms/navigation/Link'
import { DeleteIcon, LinkIcon, MoveIcon, RestoreIcon, TrashIcon } from '../../atoms/display/Icons'
import IconButton from '../../atoms/inputs/IconButton'

type FileCardProps = {
  file: FileMeta
  onClickCopyLink?: (_file: FileMeta) => void
  onClickMove?: (_file: FileMeta) => void
  onClickMoveToTrash?: (_file: FileMeta) => void
  onClickRestore?: (_file: FileMeta) => void
  onClickDelete?: (_file: FileMeta) => void
}

export default function FileCard({
  file,
  onClickCopyLink,
  onClickMove,
  onClickMoveToTrash,
  onClickRestore,
  onClickDelete,
}: FileCardProps) {
  return (
    <Card
      header={
        <Link href={file.url ?? ''}>
          <Label text={{ value: file.name, plain: true }} />
        </Link>
      }
      actions={
        <>
          {onClickCopyLink && (
            <IconButton label={{ value: 'Copy URL' }} onClick={() => onClickCopyLink(file)}>
              <LinkIcon />
            </IconButton>
          )}
          {onClickMove && (
            <IconButton label={{ value: 'Move file' }} onClick={() => onClickMove(file)}>
              <MoveIcon />
            </IconButton>
          )}
          {onClickMoveToTrash && (
            <IconButton label={{ value: 'Move file to trash' }} onClick={() => onClickMoveToTrash(file)}>
              <TrashIcon />
            </IconButton>
          )}
          {onClickRestore && (
            <IconButton label={{ value: 'Restore file' }} onClick={() => onClickRestore(file)}>
              <RestoreIcon />
            </IconButton>
          )}
          {onClickDelete && (
            <IconButton label={{ value: 'Delete file' }} onClick={() => onClickDelete(file)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <FlexColumn>
        <FlexRow>
          <Label text={{ value: 'Size' }} />
          <CapacityLabel bytes={file.bytes} />
        </FlexRow>
        <FlexRow>
          <Label text={{ value: 'Uploaded Date' }} />
          <DateTimeLabel datetime={file.createdAt} />
        </FlexRow>
      </FlexColumn>
    </Card>
  )
}
