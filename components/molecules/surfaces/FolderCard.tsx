import { Folder } from '../../../store/notes/models'
import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import IconButton from '../../atoms/inputs/IconButton'
import { TrashIcon, OpenIcon, RestoreIcon, DeleteIcon } from '../../atoms/display/Icons'
import { FlexRow } from '../../atoms/layout/Flex'

type FolderCardProps = {
  folder: Folder
  onClickFolderLink?: (_folder: Folder) => void
  onClickMoveToTrash?: (_folder: Folder) => void
  onClickRestore?: (_folder: Folder) => void
  onClickDelete?: (_folder: Folder) => void
}

export default function FolderCard({
  folder,
  onClickFolderLink,
  onClickMoveToTrash,
  onClickRestore,
  onClickDelete,
}: FolderCardProps) {
  return (
    <Card
      header={<Label text={{ value: folder.name, plain: true }} />}
      actions={
        <>
          {onClickFolderLink && (
            <IconButton label={{ value: 'Open folder' }} onClick={() => onClickFolderLink(folder)}>
              <OpenIcon />
            </IconButton>
          )}
          {onClickMoveToTrash && (
            <IconButton label={{ value: 'Move folder to trash' }} onClick={() => onClickMoveToTrash(folder)}>
              <TrashIcon />
            </IconButton>
          )}
          {onClickRestore && (
            <IconButton label={{ value: 'Restore folder' }} onClick={() => onClickRestore(folder)}>
              <RestoreIcon />
            </IconButton>
          )}
          {onClickDelete && (
            <IconButton label={{ value: 'Delete folder' }} onClick={() => onClickDelete(folder)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <FlexRow>
        <Label text={{ value: '${count} Folders', args: { count: folder.folders.length } }} />
        <Label text={{ value: '${count} Notes', args: { count: folder.notes.length } }} />
      </FlexRow>
    </Card>
  )
}
