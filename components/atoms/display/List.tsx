import MuiList from '@mui/material/List'
import { Component } from '../../../types/react'

type ListProps = {
  children: Component
}

export default function List({ children }: ListProps) {
  return <MuiList>{children}</MuiList>
}
