import { ReactElement } from 'react'
import MuiContainer from '@mui/material/Container'

type ContainerProps = {
  children: ReactElement | ReactElement[]
}

export default function Container({ children }: ContainerProps) {
  return <MuiContainer maxWidth={'md'}>{children}</MuiContainer>
}
