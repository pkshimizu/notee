import MuiAvatar from '@mui/material/Avatar'

type AvatarProps = {
  url: string
  alt: string
}

export default function Avatar({ url, alt }: AvatarProps) {
  return <MuiAvatar src={url} alt={alt} />
}
