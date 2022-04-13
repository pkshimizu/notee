import MuiTreeView from '@mui/lab/TreeView'
import React, { useCallback } from 'react'
import { ChevronRight, ExpandMore } from '@mui/icons-material'
import { Component } from '../../../types/react'

type TreeViewProps = {
  width?: string
  selectedId?: string
  expanded?: string[]
  children: Component
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
      sx={{ width: width, overflowY: 'auto' }}
    >
      {children}
    </MuiTreeView>
  )
}
