import MuiTreeView from '@mui/lab/TreeView'
import { ReactNode } from 'react'

type TreeViewProps = {
  children: ReactNode
}

export default function TreeView({ children }: TreeViewProps) {
  return <MuiTreeView>{children}</MuiTreeView>
}
