import MuiTreeItem from '@mui/lab/TreeItem'
import { ReactNode } from 'react'
import MuiBox from '@mui/material/Box'

type TreeItemProps = {
  id: string
  icon: ReactNode
  label: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: () => void
}

export default function TreeItem({ id, icon, label, end, children, onClick }: TreeItemProps) {
  return (
    <MuiTreeItem
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
      onClick={onClick}
    >
      {children}
    </MuiTreeItem>
  )
}
