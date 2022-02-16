import { useEditorSettingsPage, useProfileSettingsPage } from '../../hooks/usePages'
import ToggleButton from '../atoms/inputs/ToggleButton'
import Label from '../atoms/display/Label'
import { useCallback, useEffect, useState } from 'react'
import { FlexRow } from '../atoms/layout/Flex'
import { useRouter } from 'next/router'

export default function SettingsMenu() {
  const [page, setPage] = useState('profile')
  const profileSettingsPage = useProfileSettingsPage()
  const editorSettingsPage = useEditorSettingsPage()
  const router = useRouter()
  useEffect(() => {
    const path = router.pathname
    setPage(path.split('/')[2])
  }, [router, setPage])
  const handleChange = useCallback(
    (value: string) => {
      if (value === 'profile') {
        profileSettingsPage()
      }
      if (value === 'editor') {
        editorSettingsPage()
      }
    },
    [profileSettingsPage, editorSettingsPage]
  )

  return (
    <FlexRow width={200}>
      <ToggleButton
        value={page}
        items={[
          {
            value: 'profile',
            content: <Label text={{ value: 'Profile' }} />,
          },
          {
            value: 'editor',
            content: <Label text={{ value: 'Editor' }} />,
          },
        ]}
        vertical
        onChange={handleChange}
      />
    </FlexRow>
  )
}
