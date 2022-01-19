import { ReactNode } from 'react'
import MuiMenuList from '@mui/material/MenuList'

type MenuListProps = {
  width?: number
  children: ReactNode
}

export default function MenuList({ width, children }: MenuListProps) {
  return (
    <MuiMenuList
      sx={{
        py: 0,
        width: width,
        border: 'solid 1px #ccc',
        borderRadius: 1,
        '& > *:not(:last-child)': {
          borderBottom: 'solid 1px #ccc',
        },
      }}
    >
      {children}
    </MuiMenuList>
  )
}
