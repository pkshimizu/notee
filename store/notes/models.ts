import { ContentType } from '../../components/atoms/inputs/TextEditor'
import { Diff } from 'diff-match-patch'

type Item = {
  id: string
}

export type NoteLog = {
  id: string
  content?: string
  diff?: string
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

export type Note = Item & NoteDoc

export type FolderDoc = {
  folderId?: string
  name: string
  favorite: boolean
  deletedAt?: string
}

export type Folder = {
  folders: Folder[]
  notes: Note[]
  files: FileMeta[]
} & Item &
  FolderDoc

export type FileMetaDoc = {
  uuid: string
  name: string
  folderId: string
  bytes: number
  createdAt: string
  deletedAt?: string
}

export type FileMeta = {
  url?: string
} & Item &
  FileMetaDoc
