import { Folder } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import IconButton from '../../atoms/inputs/IconButton'
import { DeleteIcon, OpenIcon, SettingsIcon } from '../../atoms/display/Icons'
import { FlexRow } from '../../atoms/layout/Flex'

type FolderCardProps = {
  folder: Folder
  onClickFolderLink: () => void
  onClickSettings: () => void
  onClickDelete: () => void
}

export default function FolderCard({ folder, onClickFolderLink, onClickSettings, onClickDelete }: FolderCardProps) {
  return (
    <Card
      header={<Label>{folder.name}</Label>}
      actions={
        <>
          <IconButton onClick={onClickFolderLink}>
            <OpenIcon />
          </IconButton>
          <IconButton onClick={onClickSettings}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <FlexRow>
        <Label>{`${folder.folders.length}フォルダ`}</Label>
        <Label>{`${folder.notes.length}ノート`}</Label>
      </FlexRow>
    </Card>
  )
}
