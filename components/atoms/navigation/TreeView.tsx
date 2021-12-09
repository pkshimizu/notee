import MuiTreeView from '@mui/lab/TreeView'
import { ReactNode } from 'react'
import { ChevronRight, ExpandMore } from '@mui/icons-material'

type TreeViewProps = {
  width?: string
  children: ReactNode
}

export default function TreeView({ width, children }: TreeViewProps) {
  return (
    <MuiTreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} sx={{width: width}}>
      {children}
    </MuiTreeView>
  )
}
