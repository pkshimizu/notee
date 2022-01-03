import { ReactElement, ReactNode } from 'react'
import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import MuiTabContext from '@mui/lab/TabContext'
import MuiBox from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'
import { FlexColumn } from '../layout/Flex'

export type Tab = {
  value: string
  icon?: ReactElement
  label: string
}

type TabViewProps = {
  value: string
  tabs: Tab[]
  leftItem?: ReactNode
  children: ReactNode
  onChange?: (value: string) => void
}

export default function TabView({ value, tabs, leftItem, children, onChange }: TabViewProps) {
  return (
    <MuiTabContext value={value}>
      <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1, width: '100%' }}>
        {leftItem}
        <MuiTabs
          value={value}
          onChange={(event, newValue) => onChange && onChange(newValue)}
          variant={'scrollable'}
          scrollButtons={'auto'}
        >
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
        </MuiTabs>
      </MuiBox>
      <FlexColumn space={0} height={'calc(100% - 52.5px)'}>
        {children}
      </FlexColumn>
    </MuiTabContext>
  )
}
