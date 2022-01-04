import { ReactNode } from 'react'
import MuiList from '@mui/material/List'

type ListProps = {
  children: ReactNode
}

export default function List({ children }: ListProps) {
  return <MuiList>{children}</MuiList>
}
