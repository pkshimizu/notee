import { User } from '../../../repositories/AuthRepository'
import Avatar from '../../atoms/display/Avatar'

type UserImageProps = {
  user: User
}

export default function UserAvatar({ user }: UserImageProps) {
  const defaultImage = ''

  return <Avatar url={user.imageUrl ?? defaultImage} alt={user.name ?? 'user image'} />
}
