import SettingsLayout from '../../components/templates/SettingsLayout'
import { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { FlexColumn } from '../../components/atoms/layout/Flex'
import Label from '../../components/atoms/display/Label'
import Divider from '../../components/atoms/display/Divider'

export default function Editor() {
  const { setTitle } = useTitle()
  useEffect(() => {
    setTitle('Editor settings')
  }, [setTitle])

  return (
    <FlexColumn>
      <Label variant={'title'}>Editor</Label>
      <Divider />
    </FlexColumn>
  )
}

Editor.layout = SettingsLayout
