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
      header={<Label text={folder.name} plain />}
      actions={
        <>
          {onClickFolderLink && (
            <IconButton label={'Open folder'} onClick={() => onClickFolderLink(folder)}>
              <OpenIcon />
            </IconButton>
          )}
          {onClickMoveToTrash && (
            <IconButton label={'Move folder to trash'} onClick={() => onClickMoveToTrash(folder)}>
              <TrashIcon />
            </IconButton>
          )}
          {onClickRestore && (
            <IconButton label={'Restore folder'} onClick={() => onClickRestore(folder)}>
              <RestoreIcon />
            </IconButton>
          )}
          {onClickDelete && (
            <IconButton label={'Delete folder'} onClick={() => onClickDelete(folder)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <FlexRow>
        <Label text={'${count} Folders'} args={{ count: folder.folders.length }} />
        <Label text={'${count} Notes'} args={{ count: folder.notes.length }} />
      </FlexRow>
    </Card>
  )
}
