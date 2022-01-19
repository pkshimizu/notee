import SettingsLayout from '../../components/templates/SettingsLayout'
import { useEffect } from 'react'
import { useProfileSettingsPage } from '../../hooks/usePages'

export default function Settings() {
  const profileSettingsPage = useProfileSettingsPage()
  useEffect(() => {
    profileSettingsPage()
  }, [profileSettingsPage])

  return <></>
}

Settings.layout = SettingsLayout
