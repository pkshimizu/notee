import { ReactNode } from 'react'
import MuiBox from '@mui/material/Box'

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline'
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

type FlexProps = {
  align?: FlexAlign
  justify?: FlexJustify
  width?: number | string
  height?: number | string
  space?: number
  children: ReactNode
}

export function FlexColumn(props: FlexProps) {
  return (
    <Flex direction={'column'} {...props}>
      {props.children}
    </Flex>
  )
}

export function FlexRow(props: FlexProps) {
  return (
    <Flex direction={'row'} {...props}>
      {props.children}
    </Flex>
  )
}

type BaseFlexProps = {
  direction: 'row' | 'column'
} & FlexProps

function Flex({ direction, align, justify, width, height, space = 1, children }: BaseFlexProps) {
  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        width,
        height,
        flexGrow: 1,
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
