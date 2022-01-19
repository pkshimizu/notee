import { ReactNode } from 'react'
import MuiContainer from '@mui/material/Container'

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <MuiContainer maxWidth={'md'}>{children}</MuiContainer>
}
