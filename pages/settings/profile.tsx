import SettingsLayout from '../../components/templates/SettingsLayout'
import { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { FlexColumn } from '../../components/atoms/layout/Flex'
import Label from '../../components/atoms/display/Label'
import Divider from '../../components/atoms/display/Divider'
import UserAvatar from '../../components/molecules/display/UserAvatar'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session/selectors'
import TextField from '../../components/atoms/inputs/TextField'

export default function Profile() {
  const user = useSelector(currentUserSelector)
  const { setTitle } = useTitle()
  useEffect(() => {
    setTitle({ value: 'Profile Settings' })
  }, [setTitle])

  return (
    <FlexColumn>
      <Label variant={'title'} text={{ value: 'Profile' }} />
      <Divider />
      {user ? (
        <>
          <UserAvatar user={user} size={'xl'} />
          <TextField label={{ value: 'User Name' }} value={user.name} readonly size={'md'} />
          <TextField label={{ value: 'Email' }} value={user.email} readonly size={'md'} />
        </>
      ) : (
        <></>
      )}
    </FlexColumn>
  )
}

Profile.layout = SettingsLayout
Profile.login = 'required'
