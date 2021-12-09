import { Folder, Note } from '../models/note'
import { createSlice } from '@reduxjs/toolkit'

export type NotesState = {
  root: Folder
}

export const notesInitialState: NotesState = {
  root: new Folder(
    'root',
    'すべてのノート',
    [
      new Folder('sub-folder-1', 'aaaaaaaaa'),
      new Folder(
        'sub-folder-2',
        'ああああああああああああああああああ',
        [],
        [new Note('note-3', 'AWSコマンド集（ECS編）'), new Note('note-4', 'ええええええええええええええ')]
      ),
    ],
    [new Note('note-1', 'おおおおおおおおおおおおおおおおおおおお'), new Note('note-2', '')]
  ),
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default notesSlice
