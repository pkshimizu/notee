type Item = {
  id: string
}

export type NoteLog = {
  id: string
  content: string
  updatedAt: string
}

export type NoteDoc = {
  folderId: string
  content: string
  favorite: boolean
  logs: NoteLog[]
  createdAt: string
  updatedAt: string
}

export type Note = {
  title: string
} & Item &
  NoteDoc

export type FolderDoc = {
  folderId?: string
  name: string
  favorite: boolean
}

export type Folder = {
  folders: Folder[]
  notes: Note[]
} & Item &
  FolderDoc
