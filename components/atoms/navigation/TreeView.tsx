import MuiTreeView from '@mui/lab/TreeView'
import { ReactNode } from 'react'
import { ChevronRight, ExpandMore } from '@mui/icons-material'

type TreeViewProps = {
  children: ReactNode
}

export default function TreeView({ children }: TreeViewProps) {
  return (
    <MuiTreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
      {children}
    </MuiTreeView>
  )
}
