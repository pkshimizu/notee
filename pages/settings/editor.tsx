import SettingsLayout from '../../components/templates/SettingsLayout'
import { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'

export default function Editor() {
  const { setTitle } = useTitle()
  useEffect(() => {
    setTitle('Editor settings')
  }, [setTitle])
  
  return <></>
}

Editor.layout = SettingsLayout
