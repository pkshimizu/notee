import { User } from '../../../repositories/AuthRepository'
import Text from '../../atoms/display/Text'

type UserNameTextProps = {
  user: User
}

export default function UserNameText({ user }: UserNameTextProps) {
  return <Text>{user.name ?? '名前無し'}</Text>
}
