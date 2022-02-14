import { ContentType } from '../../components/atoms/inputs/TextEditor'

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
  contentType: ContentType
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type Note = {} & Item & NoteDoc

export type FolderDoc = {
  folderId?: string
  name: string
  favorite: boolean
  deletedAt?: string
}

export type Folder = {
  folders: Folder[]
  notes: Note[]
} & Item &
  FolderDoc
