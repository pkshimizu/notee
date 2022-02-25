import MuiBox from '@mui/material/Box'
import { Component } from '../../../types/react'

type RelativeBoxProps = {
  width?: string
  height?: string
  children: Component
}

export default function RelativeBox({ width = '100%', height = '100%', children }: RelativeBoxProps) {
  return (
    <MuiBox width={width} height={height} position={'relative'} boxSizing={'border-box'}>
      {children}
    </MuiBox>
  )
}
