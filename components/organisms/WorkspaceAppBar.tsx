import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import Button from '../atoms/inputs/Button'
import UserAvatar from '../molecules/display/UserAvatar'
import UserMenu from './UserMenu'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session/selectors'

type WorkspaceAppBarProps = {}

export default function WorkspaceAppBar({}: WorkspaceAppBarProps) {
  const currentUser = useSelector(currentUserSelector)
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])

  return (
    <AppBar>
      <FlexRow justify={'flex-end'} align={'center'} width={'100%'}>
        {currentUser ? (
          <Button onClick={handleClickMenu} variant={'text'}>
            <UserAvatar user={currentUser} />
          </Button>
        ) : (
          <></>
        )}
      </FlexRow>
      <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
    </AppBar>
  )
}
