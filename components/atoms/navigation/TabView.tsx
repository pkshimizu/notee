import { ReactElement, ReactNode } from 'react'
import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import MuiBox from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'

export type Tab = {
  value: string
  icon?: ReactElement
  label?: string
  panel?: ReactNode
}

type TabViewProps = {
  value: string
  tabs: Tab[]
  leftItem?: ReactNode
  variant?: 'scrollable' | 'fullWidth'
  tabsOnly?: boolean
  onChange?: (_value: string) => void
}

const tabLabel = (label: string) => {
  if (label.length > 20) {
    return label.substr(0, 18) + '...'
  }

  return label
}

export default function TabView({
  value,
  tabs,
  leftItem,
  variant = 'scrollable',
  tabsOnly = false,
  onChange,
}: TabViewProps) {
  const activeTab = tabs.find((tab) => tab.value === value)

  return (
    <MuiBox sx={{ width: '100%', height: tabsOnly ? undefined : '100%' }}>
      <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1, width: '100%' }}>
        {leftItem}
        <MuiTabs
          value={value}
          onChange={(event, newValue) => onChange && onChange(newValue)}
          variant={variant}
          scrollButtons={'auto'}
        >
          {tabs.map((tab) => (
            <MuiTab
              label={
                <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                  {tab.icon && <MuiBox sx={{ mr: 1 }}>{tab.icon}</MuiBox>}
                  {tab.label && <MuiTypography variant='button'>{tabLabel(tab.label)}</MuiTypography>}
                </MuiBox>
              }
              value={tab.value}
              iconPosition='start'
              key={tab.value}
            />
          ))}
        </MuiTabs>
      </MuiBox>
      {!tabsOnly && activeTab && activeTab.panel && (
        <MuiBox sx={{ height: 'calc(100% - 52.5px)', overflowY: 'auto' }}>{activeTab.panel}</MuiBox>
      )}
    </MuiBox>
  )
}
