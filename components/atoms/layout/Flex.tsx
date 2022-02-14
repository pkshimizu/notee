import { ReactElement } from 'react'
import MuiBox from '@mui/material/Box'

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline'
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
type SpaceSize = 0 | 1 | 2 | 4 | 8 | 16 | 32
type MarginSize = 0 | 1 | 2 | 4 | 8 | 16 | 32
type PaddingSize = 0 | 1 | 2 | 4 | 8 | 16 | 32

type FlexProps = {
  align?: FlexAlign
  justify?: FlexJustify
  width?: number | string
  height?: number | string
  space?: SpaceSize
  noWrap?: boolean
  noGrow?: boolean
  ml?: MarginSize
  mr?: MarginSize
  mt?: MarginSize
  mb?: MarginSize
  pl?: PaddingSize
  pr?: PaddingSize
  pt?: PaddingSize
  pb?: PaddingSize
  children: ReactElement | ReactElement[]
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

function Flex({
  direction,
  align,
  justify,
  width,
  height,
  space = 1,
  noWrap = false,
  noGrow = false,
  mt,
  mb,
  ml,
  mr,
  pt,
  pb,
  pl,
  pr,
  children,
}: BaseFlexProps) {
  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        width,
        height,
        flexGrow: noGrow ? 0 : 1,
        overflowY: 'auto',
        flexWrap: noWrap ? 'nowrap' : 'wrap',
        gap: space,
        mt: mt,
        mb: mb,
        ml: ml,
        mr: mr,
        pt: pt,
        pb: pb,
        pl: pl,
        pr: pr,
      }}
    >
      {children}
    </MuiBox>
  )
}
