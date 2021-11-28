import { ReactNode } from 'react'
import MuiBox from '@mui/material/Box'

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline'
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between'

type FlexProps = {
  direction: 'row' | 'column'
  align?: FlexAlign
  justify?: FlexJustify
  width?: number | string
  height?: number | string
  space?: number
  children: ReactNode
}

export default function Flex({ direction, align, justify, width, height, space = 1, children }: FlexProps) {
  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        width,
        height,
        '& > *:not(:last-child)': {
          mr: direction === 'row' ? space : undefined,
          mb: direction === 'column' ? space : undefined,
        },
      }}
    >
      {children}
    </MuiBox>
  )
}
