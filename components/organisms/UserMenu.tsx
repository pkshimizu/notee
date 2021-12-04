import Menu from '../atoms/navigation/Menu'
import MenuItem from '../atoms/navigation/MenuItem'
import LogoutIcon from '../atoms/display/icons/LogoutIcon'
import { useContext } from 'react'
import { Repository } from '../systems/RepositoryProvider'

type UserMenuProps = {
  target?: Element
  onClose: () => void
}

export default function UserMenu({ target, onClose }: UserMenuProps) {
  const { authRepository } = useContext(Repository)

  return (
    <Menu target={target} onClose={onClose}>
      <MenuItem icon={<LogoutIcon />} onClick={authRepository.logout}>
        Logout
      </MenuItem>
    </Menu>
  )
}
