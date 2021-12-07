import { Folder } from '../models/note'
import { createSlice } from '@reduxjs/toolkit'

export type NotesState = {
  root: Folder
}

export const notesInitialState: NotesState = {
  root: new Folder('全てのノート', []),
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default notesSlice
