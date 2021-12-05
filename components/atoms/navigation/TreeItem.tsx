import MuiTreeItem from '@mui/lab/TreeItem'
import { ReactNode } from 'react'

type TreeItemProps = {
  id: string
  icon: ReactNode
  label: string
  children?: ReactNode
}

export default function TreeItem({ id, icon, label, children }: TreeItemProps) {
  return (
    <MuiTreeItem nodeId={id} label={label} icon={icon}>
      {children}
    </MuiTreeItem>
  )
}
