import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Folder, Note } from './notes'
import { Tab } from '../components/atoms/navigation/TabView'

export type WorkspaceTab = {
  folder?: Folder
  note?: Note
} & Tab

export type WorkspaceState = {
  tabs: WorkspaceTab[]
  activeTabId?: string
}

export const workspaceInitialState: WorkspaceState = {
  tabs: [],
  activeTabId: undefined,
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    addFolder: (state: WorkspaceState, action: PayloadAction<Folder>) => {
      if (state.tabs.map((tab) => tab.value).includes(action.payload.id)) {
        return {
          ...state,
          activeTabId: action.payload.id,
        }
      }
      return {
        ...state,
        tabs: state.tabs.concat({
          value: action.payload.id,
          label: action.payload.name,
          folder: action.payload,
        }),
        activeTabId: action.payload.id,
      }
    },
    addNote: (state: WorkspaceState, action: PayloadAction<Note>) => {
      if (state.tabs.map((tab) => tab.value).includes(action.payload.id)) {
        return {
          ...state,
          activeTabId: action.payload.id,
        }
      }

      return {
        ...state,
        tabs: state.tabs.concat({
          value: action.payload.id,
          label: action.payload.title,
          note: action.payload,
        }),
        activeTabId: action.payload.id,
      }
    },
  },
})

export default workspaceSlice
