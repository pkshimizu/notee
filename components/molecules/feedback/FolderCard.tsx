import { Folder } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import IconButton from '../../atoms/inputs/IconButton'
import { OpenIcon } from '../../atoms/display/Icons'
import { useCallback, useContext } from 'react'
import { FlexRow } from '../../atoms/layout/Flex'
import { Router } from '../../systems/RouterProvider'

type FolderCardProps = {
  folder: Folder
}

export default function FolderCard({ folder }: FolderCardProps) {
  const { go } = useContext(Router)
  const handleOpenFolder = useCallback(() => {
    go(`/notes/${folder.id}`)
  }, [go, folder])

  return (
    <Card
      header={<Label>{folder.name}</Label>}
      actions={
        <IconButton onClick={handleOpenFolder}>
          <OpenIcon />
        </IconButton>
      }
    >
      <FlexRow>
        <Label>{`${folder.folders.length}フォルダ`}</Label>
        <Label>{`${folder.notes.length}ノート`}</Label>
      </FlexRow>
    </Card>
  )
}
