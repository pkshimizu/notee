import MuiAvatar from '@mui/material/Avatar'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

type AvatarProps = {
  url: string
  alt: string
  size?: AvatarSize
}

function sizeToPx(size: AvatarSize) {
  switch (size) {
  case 'sm':
    return 24
  case 'md':
    return 40
  case 'lg':
    return 64
  case 'xl':
    return 128
  }
}

export default function Avatar({ url, alt, size = 'md' }: AvatarProps) {
  return <MuiAvatar src={url} alt={alt} sx={{ width: sizeToPx(size), height: sizeToPx(size) }} />
}
