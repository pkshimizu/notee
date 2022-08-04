import MuiBox from '@mui/material/Box'
import { Component } from '../../../types/react'

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline'
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
type Color = 'primary' | 'secondary'
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
  ma?: MarginSize
  mx?: MarginSize
  my?: MarginSize
  ml?: MarginSize
  mr?: MarginSize
  mt?: MarginSize
  mb?: MarginSize
  pa?: PaddingSize
  px?: PaddingSize
  py?: PaddingSize
  pl?: PaddingSize
  pr?: PaddingSize
  pt?: PaddingSize
  pb?: PaddingSize
  color?: Color
  children?: Component
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
  ma,
  mx = ma,
  my = ma,
  mt = my,
  mb = my,
  ml = mx,
  mr = mx,
  pa,
  px = pa,
  py = pa,
  pt = py,
  pb = py,
  pl = px,
  pr = px,
  color,
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
        minWidth: width,
        minHeight: height,
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
        backgroundColor: color ? `${color}.light` : undefined,
      }}
    >
      {children}
    </MuiBox>
  )
}
