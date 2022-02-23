import { FontSize } from '../../components/atoms/inputs/TextEditor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

type PreviewSize = 'half' | 'full' | 'none'

type EditorCursor = {
  row: number
  column: number
}

type EditorState = {
  id: string
  propertiesPanel: boolean
  fontSize: FontSize
  cursor: EditorCursor
  preview: PreviewSize
  syncScroll: boolean
}

export type EditorsState = {
  selectedId?: string
  states: EditorState[]
}

export const editorsInitialState: EditorsState = {
  selectedId: undefined,
  states: [],
}

type SelectParams = {
  id: string
}

type UpdateEditorParams = {
  id: string
  editor: Editor
}

type UpdatePropertiesPanelParams = {
  id: string
  open: boolean
}

type UpdateFontSizeParams = {
  id: string
  size: FontSize
}

type UpdateCursorParams = {
  id: string
  cursor: EditorCursor
}

type UpdatePreviewParams = {
  id: string
  size: PreviewSize
}

type UpdateSyncScrollParams = {
  id: string
  sync: boolean
}

function findOrCreate(state: EditorsState, id: string) {
  const editorState = state.states.find((editorState) => (editorState.id = id))
  if (editorState) {
    return editorState
  }
  const newState: EditorState = {
    id,
    propertiesPanel: false,
    fontSize: 14,
    cursor: { row: 1, column: 1 },
    preview: 'none',
    syncScroll: true,
  }
  state.states.push(newState)
  return newState
}

const editorsSlice = createSlice({
  name: 'editors',
  initialState: editorsInitialState,
  reducers: {
    select: (state: EditorsState, action: PayloadAction<SelectParams>) => {
      state.selectedId = action.payload.id
    },
    updatePropertiesPanel: (state: EditorsState, action: PayloadAction<UpdatePropertiesPanelParams>) => {
      const editorState = findOrCreate(state, action.payload.id)
      editorState.propertiesPanel = action.payload.open
    },
    updateFontSize: (state: EditorsState, action: PayloadAction<UpdateFontSizeParams>) => {
      const editorState = findOrCreate(state, action.payload.id)
      editorState.fontSize = action.payload.size
    },
    updateCursor: (state: EditorsState, action: PayloadAction<UpdateCursorParams>) => {
      const editorState = findOrCreate(state, action.payload.id)
      editorState.cursor = action.payload.cursor
    },
    updatePreview: (state: EditorsState, action: PayloadAction<UpdatePreviewParams>) => {
      const editorState = findOrCreate(state, action.payload.id)
      editorState.preview = action.payload.size
    },
    updateSyncScroll: (state: EditorsState, action: PayloadAction<UpdateSyncScrollParams>) => {
      const editorState = findOrCreate(state, action.payload.id)
      editorState.syncScroll = action.payload.sync
    },
  },
})

export default editorsSlice
