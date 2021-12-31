import MuiBox from '@mui/material/Box'
import { ReactNode } from 'react'

type RelativeBoxProps = {
  width?: string
  height?: string
  children: ReactNode
}

export default function RelativeBox({ width = '100%', height = '100%', children }: RelativeBoxProps) {
  return (
    <MuiBox width={width} height={height} position={'relative'} boxSizing={'border-box'}>
      {children}
    </MuiBox>
  )
}
