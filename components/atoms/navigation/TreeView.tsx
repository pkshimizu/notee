import MuiTreeView from '@mui/lab/TreeView'
import React, { ReactNode, useCallback } from 'react'
import { ChevronRight, ExpandMore } from '@mui/icons-material'

type TreeViewProps = {
  width?: string
  selectedId?: string
  expanded?: string[]
  children: ReactNode
  onSelect: (_value: string) => void
}

export default function TreeView({ width, selectedId = '', expanded, children, onSelect }: TreeViewProps) {
  const handleSelect = useCallback(
    (event: React.SyntheticEvent, nodeId: string) => {
      onSelect(nodeId)
    },
    [onSelect]
  )

  return (
    <MuiTreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      expanded={expanded}
      onNodeSelect={handleSelect}
      selected={selectedId}
      sx={{ width: width }}
    >
      {children}
    </MuiTreeView>
  )
}
