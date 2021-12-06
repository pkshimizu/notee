import NextImage from 'next/image'
import { styled } from '@mui/material'

type ImageProps = {
  url: string
  alt: string
  width: number
  height: number
}

const StyledImage = styled(NextImage)({
  borderRadius: '50%',
})

export default function CircleImage({ url, alt, width, height }: ImageProps) {
  return <StyledImage src={url} alt={alt} width={width} height={height} />
}
