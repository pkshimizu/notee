import { Folder } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import IconButton from '../../atoms/inputs/IconButton'
import { OpenIcon } from '../../atoms/display/Icons'
import { useCallback } from 'react'
import { FlexRow } from '../../atoms/layout/Flex'
import { useNotesPage } from '../../../hooks/usePages'

type FolderCardProps = {
  folder: Folder
}

export default function FolderCard({ folder }: FolderCardProps) {
  const notesPage = useNotesPage()
  const handleOpenFolder = useCallback(() => {
    notesPage(folder.id)
  }, [notesPage, folder])

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
