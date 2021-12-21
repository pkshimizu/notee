import { ReactElement, ReactNode } from 'react'
import MuiTab from '@mui/material/Tab'
import MuiTabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import MuiBox from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'

export type Tab = {
  value: string
  icon?: ReactElement
  label: string
}

type TabViewProps = {
  value: string
  tabs: Tab[]
  children: ReactNode
  onChange?: (value: string) => void
}

export default function TabView({ value, tabs, children, onChange }: TabViewProps) {
  return (
    <MuiTabContext value={value}>
      <MuiTabList onChange={(event, newValue) => onChange && onChange(newValue)}>
        {tabs.map((tab) => (
          <MuiTab
            label={
              <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                {tab.icon && <MuiBox sx={{ mr: 1 }}>{tab.icon}</MuiBox>}
                <MuiTypography variant='button'>{tab.label}</MuiTypography>
              </MuiBox>
            }
            value={tab.value}
            iconPosition='start'
            key={tab.value}
          />
        ))}
      </MuiTabList>
      {children}
    </MuiTabContext>
  )
}
