import Text from '../../atoms/display/Text'
import { User } from '../../../store/session/models'

type UserNameLabelProps = {
  user: User
}

export default function UserNameLabel({ user }: UserNameLabelProps) {
  return <Text>{user.name ?? '名前無し'}</Text>
}
