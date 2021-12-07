import Menu from '../atoms/navigation/Menu'
import MenuItem from '../atoms/navigation/MenuItem'
import LogoutIcon from '../atoms/display/icons/LogoutIcon'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/session'

type UserMenuProps = {
  target?: Element
  onClose: () => void
}

export default function UserMenu({ target, onClose }: UserMenuProps) {
  const dispatch = useDispatch()
  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <Menu target={target} onClose={onClose}>
      <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  )
}
