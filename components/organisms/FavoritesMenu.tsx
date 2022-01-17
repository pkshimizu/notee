import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon } from '../atoms/display/Icons'
import { useCallback } from 'react'
import workspaceSlice from '../../store/workspace'
import { useDispatch } from 'react-redux'

type FavoritesMenuProps = {}

export default function FavoritesMenu({}: FavoritesMenuProps) {
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.closeFavorites())
  }, [dispatch])

  return (
    <AppBar>
      <FlexRow justify={'flex-end'}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
