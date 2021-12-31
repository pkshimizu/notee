import { ReactNode } from 'react'
import MuiTabPanel from '@mui/lab/TabPanel'

type TabPanelProps = {
  value: string
  children: ReactNode
}

export default function TabPanel({ value, children }: TabPanelProps) {
  return (
    <MuiTabPanel value={value} sx={{ p: 0, height: '100%' }}>
      {children}
    </MuiTabPanel>
  )
}
