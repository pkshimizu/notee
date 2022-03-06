import Menu from '../atoms/navigation/Menu'
import MenuItem from '../atoms/navigation/MenuItem'
import { LogoutIcon, SettingsIcon } from '../atoms/display/Icons'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import SessionActions from '../../store/session/actions'
import { useProfileSettingsPage } from '../../hooks/usePages'
import Divider from '../atoms/display/Divider'

type UserMenuProps = {
  target?: Element
  onClose: () => void
}

export default function UserMenu({ target, onClose }: UserMenuProps) {
  const profileSettingsPage = useProfileSettingsPage()
  const dispatch = useDispatch()
  const handleLogout = useCallback(() => {
    dispatch(SessionActions.logout())
    onClose()
  }, [dispatch, onClose])
  const handleSettings = useCallback(() => {
    profileSettingsPage()
    onClose()
  }, [profileSettingsPage, onClose])

  return (
    <Menu target={target} onClose={onClose}>
      <MenuItem icon={<SettingsIcon />} label={{ value: 'Settings' }} onClick={handleSettings} />
      <Divider />
      <MenuItem icon={<LogoutIcon />} label={{ value: 'Logout' }} onClick={handleLogout} />
    </Menu>
  )
}
