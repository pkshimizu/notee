import NextImage from 'next/image'
import MuiBox from '@mui/material/Box'

type ImageProps = {
  url: string
  alt: string
  width: number
  height: number
}

export default function Image({ url, alt, width, height }: ImageProps) {
  return (
    <MuiBox>
      <NextImage src={url} alt={alt} width={width} height={height} />
    </MuiBox>
  )
}
