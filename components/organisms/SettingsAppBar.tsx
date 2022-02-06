import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import Button from '../atoms/inputs/Button'
import UserAvatar from '../molecules/display/UserAvatar'
import AppBar from '../atoms/surfaces/AppBar'
import UserMenu from './UserMenu'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session/selectors'
import { useCallback, useState } from 'react'
import { BackIcon } from '../atoms/display/Icons'
import { useActiveNotesPage } from '../../hooks/usePages'

export default function SettingsAppBar() {
  const currentUser = useSelector(currentUserSelector)
  const activeNotePage = useActiveNotesPage()
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])

  return (
    <AppBar>
      <FlexRow justify={'space-between'} align={'center'}>
        <IconButton label={'back'} color={'white'} onClick={activeNotePage}>
          <BackIcon />
        </IconButton>
        {currentUser && (
          <Button onClick={handleClickMenu} variant={'text'}>
            <UserAvatar user={currentUser} />
          </Button>
        )}
      </FlexRow>
      <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
    </AppBar>
  )
}
