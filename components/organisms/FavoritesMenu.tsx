import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon } from '../atoms/display/Icons'
import { useCallback } from 'react'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type FavoritesMenuProps = {}

export default function FavoritesMenu({}: FavoritesMenuProps) {
  const { closeFavorites } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeFavorites()
  }, [closeFavorites])

  return (
    <AppBar>
      <FlexRow justify={'flex-end'}>
        <IconButton label={'close tab'} color={'white'} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
