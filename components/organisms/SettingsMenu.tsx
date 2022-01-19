import { useEditorSettingsPage, useProfileSettingsPage } from '../../hooks/usePages'
import MenuList from '../atoms/navigation/MenuList'
import MenuItem from '../atoms/navigation/MenuItem'

export default function SettingsMenu() {
  const profileSettingsPage = useProfileSettingsPage()
  const editorSettingsPage = useEditorSettingsPage()

  return (
    <MenuList width={200}>
      <MenuItem onClick={profileSettingsPage}>Profile</MenuItem>
      <MenuItem onClick={editorSettingsPage}>Editor</MenuItem>
    </MenuList>
  )
}
