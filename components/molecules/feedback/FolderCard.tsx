import { Folder } from '../../../store/notes'
import Card from '../../atoms/surfaces/Card'
import Label from '../../atoms/display/Label'
import IconButton from '../../atoms/inputs/IconButton'
import { DeleteIcon, OpenIcon, SettingsIcon } from '../../atoms/display/Icons'
import { useCallback, useState } from 'react'
import { FlexRow } from '../../atoms/layout/Flex'
import { useNotesPage } from '../../../hooks/usePages'
import FolderSettingsDialog from '../../organisms/FolderSettingsDialog'
import FolderDeleteDialog from '../../organisms/FolderDeleteDialog'

type FolderCardProps = {
  folder: Folder
}

export default function FolderCard({ folder }: FolderCardProps) {
  const [openSettings, setOpenSettings] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const notesPage = useNotesPage()
  const handleOpenFolder = useCallback(() => {
    notesPage(folder.id)
  }, [notesPage, folder])
  const handleOpenSettings = useCallback(() => {
    setOpenSettings(true)
  }, [])
  const handleCloseSettings = useCallback(() => {
    setOpenSettings(false)
  }, [])
  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true)
  }, [])
  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false)
  }, [])

  return (
    <Card
      header={<Label>{folder.name}</Label>}
      actions={
        <>
          <IconButton onClick={handleOpenFolder}>
            <OpenIcon />
          </IconButton>
          <IconButton onClick={handleOpenSettings}>
            <SettingsIcon />
          </IconButton>
          <FolderSettingsDialog open={openSettings} folder={folder} onClose={handleCloseSettings} />
          <IconButton onClick={handleOpenDelete}>
            <DeleteIcon />
          </IconButton>
          <FolderDeleteDialog open={openDelete} folder={folder} onClose={handleCloseDelete} />
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
