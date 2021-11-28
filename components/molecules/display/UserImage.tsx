import { User } from '../../../repositories/AuthRepository'
import CircleImage from '../../atoms/display/CircleImage'

type UserImageProps = {
  user: User
}

export default function UserImage({ user }: UserImageProps) {
  const defaultImage = ''

  return <CircleImage url={user.imageUrl ?? defaultImage} alt={user.name ?? 'user image'} width={64} height={64} />
}
