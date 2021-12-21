import MuiTreeItem, { TreeItemContentProps, useTreeItem, TreeItemProps as MuiTreeItemProps } from '@mui/lab/TreeItem'
import React, { ReactNode } from 'react'
import MuiBox from '@mui/material/Box'
import clsx from 'clsx'
import MuiTypography from '@mui/material/Typography'

type TreeItemProps = {
  id: string
  icon: ReactNode
  label: ReactNode
  end?: ReactNode
  children?: ReactNode
}

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId)

  const icon = iconProp || expansionIcon || displayIcon

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event)
  }

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event)
  }

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <MuiTypography onClick={handleSelectionClick} component='div' className={classes.label}>
        {label}
      </MuiTypography>
    </div>
  )
})

const CustomTreeItem = (props: MuiTreeItemProps) => <MuiTreeItem ContentComponent={CustomContent} {...props} />

export default function TreeItem({ id, icon, label, end, children }: TreeItemProps) {
  return (
    <CustomTreeItem
      nodeId={id}
      label={
        <MuiBox sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
          <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
            <MuiBox sx={{ mr: 1 }}>{icon}</MuiBox>
            {label}
          </MuiBox>
          {end}
        </MuiBox>
      }
    >
      {children}
    </CustomTreeItem>
  )
}
