import { ReactElement } from 'react'
import MuiList from '@mui/material/List'

type ListProps = {
  children: ReactElement[]
}

export default function List({ children }: ListProps) {
  return <MuiList>{children}</MuiList>
}
