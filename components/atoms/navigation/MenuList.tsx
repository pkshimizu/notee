import { ReactNode } from 'react'
import MuiMenuList from '@mui/material/MenuList'

type MenuListProps = {
  children: ReactNode
}

export default function MenuList({ children }: MenuListProps) {
  return <MuiMenuList>{children}</MuiMenuList>
}
