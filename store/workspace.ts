import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tab } from '../components/atoms/navigation/TabView'
import { StoreState } from './index'

export type WorkspaceState = {
  tabs: Tab[]
  activeTabValue?: string
  openSideBar: boolean
}

export const workspaceInitialState: WorkspaceState = {
  tabs: [],
  activeTabValue: undefined,
  openSideBar: true,
}

// actions

// selectors
const workspaceSelector = (state: StoreState) => state.workspace
export const tabsSelector = createSelector([workspaceSelector], (state) => state.tabs)
export const activeTabSelector = createSelector([workspaceSelector], (state) =>
  state.tabs.find((tab) => tab.value === state.activeTabValue)
)
export const openSideBarSelector = createSelector([workspaceSelector], (state) => state.openSideBar)

// slice
type OpenParams = {
  tab: Tab
}
type CloseParams = {
  id: string
}
type ActiveParams = {
  id: string
}
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    open: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      if (state.tabs.map((tab) => tab.value).includes(action.payload.tab.value)) {
        return {
          ...state,
          activeTabValue: action.payload.tab.value,
        }
      }
      return {
        ...state,
        tabs: state.tabs.concat({
          ...action.payload.tab,
        }),
        activeTabValue: action.payload.tab.value,
      }
    },
    close: (state: WorkspaceState, action: PayloadAction<CloseParams>) => {
      if (state.tabs.length === 1) {
        return {
          ...state,
          tabs: [],
          activeTabValue: undefined,
        }
      }
      const index = state.tabs.map((tab) => tab.value).indexOf(action.payload.id)
      if (index < 0) {
        return state
      }
      const nextTab = index === 0 ? state.tabs[1] : state.tabs[index - 1]
      const tabs = state.tabs.filter((tab) => tab.value !== action.payload.id)
      return {
        ...state,
        tabs: tabs,
        activeTabValue: nextTab.value,
      }
    },
    active: (state: WorkspaceState, action: PayloadAction<ActiveParams>) => ({
      ...state,
      activeTabValue: action.payload.id,
    }),
    toggleSideBar: (state: WorkspaceState) => ({
      ...state,
      openSideBar: !state.openSideBar,
    }),
  },
})

export default workspaceSlice
