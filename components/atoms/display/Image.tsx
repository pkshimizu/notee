import NextImage from 'next/image'

type ImageProps = {
  url: string
  alt: string
  width: number
  height: number
}

export default function Image({ url, alt, width, height }: ImageProps) {
  return <NextImage src={url} alt={alt} width={width} height={height} />
}
