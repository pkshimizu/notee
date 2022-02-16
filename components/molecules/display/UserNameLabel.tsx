import { User } from '../../../store/session/models'
import Label from '../../atoms/display/Label'

type UserNameLabelProps = {
  user: User
}

export default function UserNameLabel({ user }: UserNameLabelProps) {
  return <Label text={{ value: user.name, defaultValue: 'No Name', plain: true }} />
}
