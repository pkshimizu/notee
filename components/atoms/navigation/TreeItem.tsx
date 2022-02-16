import MuiTreeItem from '@mui/lab/TreeItem'
import React, { ReactElement } from 'react'
import MuiBox from '@mui/material/Box'
import { LabelText, useLocale } from '../../../hooks/useLocale'

type TreeItemProps = {
  id: string
  icon: ReactElement
  label: LabelText
  end?: ReactElement
  children?: ReactElement | ReactElement[]
}

export default function TreeItem({ id, icon, label, end, children }: TreeItemProps) {
  const { t } = useLocale()

  return (
    <MuiTreeItem
      nodeId={id}
      label={
        <MuiBox sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
          <MuiBox
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1, wordBreak: 'break-all' }}
          >
            <MuiBox sx={{ mr: 1 }}>{icon}</MuiBox>
            {t(label)}
          </MuiBox>
          {end}
        </MuiBox>
      }
    >
      {children}
    </MuiTreeItem>
  )
}
