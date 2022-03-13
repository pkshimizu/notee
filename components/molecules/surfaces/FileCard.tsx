import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import CapacityLabel from '../display/CapacityLabel'
import DateTimeLabel from '../display/DateTimeLabel'
import { File } from '../../../store/notes/models'
import Link from '../../atoms/navigation/Link'
import { DeleteIcon, RestoreIcon, TrashIcon } from '../../atoms/display/Icons'
import IconButton from '../../atoms/inputs/IconButton'

type FileCardProps = {
  file: File
  onClickMoveToTrash?: (_file: File) => void
  onClickRestore?: (_file: File) => void
  onClickDelete?: (_file: File) => void
}

export default function FileCard({ file, onClickMoveToTrash, onClickRestore, onClickDelete }: FileCardProps) {
  return (
    <Card
      header={
        <Link href={file.url ?? ''}>
          <Label text={{ value: file.name, plain: true }} />
        </Link>
      }
      actions={
        <>
          {onClickMoveToTrash && (
            <IconButton label={{ value: 'Move folder to trash' }} onClick={() => onClickMoveToTrash(file)}>
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
