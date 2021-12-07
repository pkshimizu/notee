import { User } from '../../../models/user'
import Text from '../../atoms/display/Text'

type UserNameLabelProps = {
  user: User
}

export default function UserNameLabel({ user }: UserNameLabelProps) {
  return <Text>{user.name ?? '名前無し'}</Text>
}
