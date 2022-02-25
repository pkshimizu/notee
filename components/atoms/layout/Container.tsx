import MuiContainer from '@mui/material/Container'
import { Component } from '../../../types/react'

type ContainerProps = {
  children: Component
}

export default function Container({ children }: ContainerProps) {
  return <MuiContainer maxWidth={'md'}>{children}</MuiContainer>
}
