import {ReactNode} from "react";
import MuiTab from "@mui/material/Tab"
import MuiTabContext from "@mui/lab/TabContext"
import MuiTabList from "@mui/lab/TabList"

export type Tab = {
  value: string
  label: string
}

type TabViewProps = {
  value: string
  tabs: Tab[]
  children: ReactNode
  onChange?: (value: string) => void
}

export default function TabView({value, tabs, children, onChange}: TabViewProps) {
  return (
    <MuiTabContext value={value}>
      <MuiTabList onChange={(event, newValue) => onChange && onChange(newValue)}>
        {
          tabs.map(tab => (
            <MuiTab label={tab.label} value={tab.value} />
          ))
        }
      </MuiTabList>
      {children}
    </MuiTabContext>
  )
}
