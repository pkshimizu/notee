import { ReactNode } from 'react'
import MuiBox from '@mui/material/Box'

type TabPanelProps = {
  value: string
  children: ReactNode
}

export default function TabPanel({ children }: TabPanelProps) {
  return <MuiBox sx={{ height: '100%' }}>{children}</MuiBox>
}
