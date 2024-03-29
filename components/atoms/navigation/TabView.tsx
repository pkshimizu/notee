import { ReactElement } from 'react'
import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import MuiBox from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'
import { LabelText, useLocale } from '../../../hooks/useLocale'
import { Component } from '../../../types/react'

export type Tab = {
  value: string
  icon?: ReactElement
  label?: LabelText
  action?: Component
  panel?: Component
}

type TabViewProps = {
  value: string
  tabs: Tab[]
  leftItem?: Component
  variant?: 'scrollable' | 'fullWidth'
  tabsOnly?: boolean
  onChange?: (_value: string) => void
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
  const { t } = useLocale()

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
                <MuiBox sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                  {tab.icon}
                  {tab.label && <MuiTypography variant='button'>{t({ ...tab.label, truncate: 20 })}</MuiTypography>}
                  {tab.action}
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
