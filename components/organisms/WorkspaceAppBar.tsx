import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import Button from '../atoms/inputs/Button'
import UserAvatar from '../molecules/display/UserAvatar'
import UserMenu from './UserMenu'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session/selectors'
import IconButton from '../atoms/inputs/IconButton'
import { MenuIcon } from '../atoms/display/Icons'
import workspaceSlice from '../../store/workspace'

type WorkspaceAppBarProps = {}

export default function WorkspaceAppBar({}: WorkspaceAppBarProps) {
  const currentUser = useSelector(currentUserSelector)
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const dispatch = useDispatch()
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])

  return (
    <AppBar>
      <FlexRow justify={'space-between'} align={'center'} width={'100%'}>
        {currentUser && (
          <Button onClick={handleClickMenu} variant={'text'}>
            <UserAvatar user={currentUser} />
          </Button>
        )}
        <IconButton onClick={handleToggleSideBar}>
          <MenuIcon />
        </IconButton>
      </FlexRow>
      <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
    </AppBar>
  )
}
