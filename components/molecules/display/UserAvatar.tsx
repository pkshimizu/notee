import Avatar, { AvatarSize } from '../../atoms/display/Avatar'
import { User } from '../../../store/session/models'

type UserImageProps = {
  user: User
  size?: AvatarSize
}

export default function UserAvatar({ user, size }: UserImageProps) {
  const defaultImage = ''

  return <Avatar url={user.imageUrl ?? defaultImage} alt={user.name ?? 'user image'} size={size} />
}
