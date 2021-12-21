import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Folder, Note } from './notes'
import { Tab } from '../components/atoms/navigation/TabView'
import { StoreState } from './index'

export type WorkspaceTab = {
  folder?: Folder
  note?: Note
} & Tab

export type WorkspaceState = {
  tabs: WorkspaceTab[]
  activeTabValue?: string
}

export const workspaceInitialState: WorkspaceState = {
  tabs: [],
  activeTabValue: undefined,
}

// actions

// selectors
const workspaceSelector = (state: StoreState) => state.workspace
export const tabsSelector = createSelector([workspaceSelector], (state) => state.tabs)
export const activeTabSelector = createSelector([workspaceSelector], (state) =>
  state.tabs.find((tab) => tab.value === state.activeTabValue)
)

// slice
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    openFolder: (state: WorkspaceState, action: PayloadAction<Folder>) => {
      if (state.tabs.map((tab) => tab.value).includes(action.payload.id)) {
        return {
          ...state,
          activeTabValue: action.payload.id,
        }
      }
      return {
        ...state,
        tabs: state.tabs.concat({
          value: action.payload.id,
          label: action.payload.name,
          folder: action.payload,
        }),
        activeTabValue: action.payload.id,
      }
    },
    openNote: (state: WorkspaceState, action: PayloadAction<Note>) => {
      if (state.tabs.map((tab) => tab.value).includes(action.payload.id)) {
        return {
          ...state,
          activeTabValue: action.payload.id,
        }
      }

      return {
        ...state,
        tabs: state.tabs.concat({
          value: action.payload.id,
          label: action.payload.title,
          note: action.payload,
        }),
        activeTabValue: action.payload.id,
      }
    },
    close: (state: WorkspaceState, action: PayloadAction<string>) => {
      if (state.tabs.length === 1) {
        return {
          ...state,
          tabs: [],
          activeTabValue: undefined,
        }
      }
      const index = state.tabs.map((tab) => tab.value).indexOf(action.payload)
      const nextTab = index === 0 ? state.tabs[1] : state.tabs[index - 1]
      const tabs = state.tabs.filter((tab) => tab.value !== action.payload)
      return {
        ...state,
        tabs: tabs,
        activeTabValue: nextTab.value,
      }
    },
    active: (state: WorkspaceState, action: PayloadAction<string>) => ({
      ...state,
      activeTabValue: action.payload,
    }),
  },
})

export default workspaceSlice
