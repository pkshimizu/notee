import SettingsLayout from '../../components/templates/SettingsLayout'
import { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'

export default function Profile() {
  const { setTitle } = useTitle()
  useEffect(() => {
    setTitle('Profile settings')
  }, [setTitle])

  return <></>
}

Profile.layout = SettingsLayout
