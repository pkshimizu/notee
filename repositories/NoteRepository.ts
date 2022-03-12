import { firestore } from './firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from '@firebase/firestore'
import { User } from '../store/session/models'
import { File, FileDoc, Folder, FolderDoc, Note, NoteDoc } from '../store/notes/models'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { ContentType } from '../components/atoms/inputs/TextEditor'
import { diff_match_patch } from 'diff-match-patch'

type FolderEventListener = (folder: Folder) => void
type NoteEventListener = (note: Note) => void
type FileEventListener = (file: File) => void

const docToFolder = (doc: QueryDocumentSnapshot<DocumentData>): Folder => {
  return {
    id: doc.id,
    folderId: doc.data().folderId,
    name: doc.data().name,
    favorite: doc.data().favorite,
    folders: [],
    notes: [],
    files: [],
    deletedAt: doc.data().deletedAt ?? undefined,
  }
}
const docToNote = (doc: QueryDocumentSnapshot<DocumentData>): Note => {
  const data = doc.data()
  const content = data.content
  return {
    id: doc.id,
    folderId: data.folderId,
    content: content,
    favorite: doc.data().favorite,
    logs: data.logs ?? [],
    contentType: data.contentType ?? 'markdown',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt ?? undefined,
  }
}

const docToFile = (doc: QueryDocumentSnapshot<DocumentData>): File => {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    bytes: data.bytes,
    folderId: data.folderId,
    createdAt: data.createdAt,
    deletedAt: data.deletedAt ?? undefined,
  }
}

type UpdateFolderParams = {
  name?: string
  folderId?: string
  favorite?: boolean
}

type UpdateNoteParams = {
  content?: string
  folderId?: string
  favorite?: boolean
  contentType?: ContentType
}

type UpdateFileParams = {
  name?: string
  folderId?: string
}

export default class NoteRepository {
  private dmp: diff_match_patch

  constructor() {
    this.dmp = new diff_match_patch()
  }

  async loadFolders(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersDocs = await getDocs(collection(userDoc, 'folders'))
    if (foldersDocs.empty) {
      return undefined
    }
    const folders: { [key: string]: Folder } = {}
    foldersDocs.forEach((doc) => {
      folders[doc.id] = docToFolder(doc)
    })
    return folders
  }
  async loadNotes(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notesDocs = await getDocs(collection(userDoc, 'notes'))
    const notes: { [key: string]: Note } = {}
    notesDocs.forEach((doc) => {
      notes[doc.id] = docToNote(doc)
    })
    return notes
  }
  async loadFiles(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const fileDocs = await getDocs(collection(userDoc, 'files'))
    const files: File[] = []
    fileDocs.forEach((doc) => {
      files.push(docToFile(doc))
    })
    return files
  }
  onSnapshotFolders(
    user: User,
    onAdded: FolderEventListener,
    onModified: FolderEventListener,
    onRemoved: FolderEventListener
  ) {
    const foldersCollection = collection(doc(firestore, `/users/${user.uid}`), 'folders')
    onSnapshot(foldersCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const folder = docToFolder(change.doc)
        switch (change.type) {
          case 'added':
            onAdded(folder)
            return
          case 'modified':
            onModified(folder)
            return
          case 'removed':
            onRemoved(folder)
            return
        }
      })
    })
  }
  onSnapshotNotes(user: User, onAdded: NoteEventListener, onModified: NoteEventListener, onRemoved: NoteEventListener) {
    const notesCollection = collection(doc(firestore, `/users/${user.uid}`), 'notes')
    onSnapshot(notesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const note = docToNote(change.doc)
        switch (change.type) {
          case 'added':
            onAdded(note)
            return
          case 'modified':
            if (change.doc.metadata.hasPendingWrites) {
              onModified(note)
            }
            return
          case 'removed':
            onRemoved(note)
            return
        }
      })
    })
  }
  onSnapshotFiles(user: User, onAdded: FileEventListener, onModified: FileEventListener, onRemoved: FileEventListener) {
    const filesCollection = collection(doc(firestore, `/users/${user.uid}`), 'files')
    onSnapshot(filesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const file = docToFile(change.doc)
        switch (change.type) {
          case 'added':
            onAdded(file)
            return
          case 'modified':
            if (change.doc.metadata.hasPendingWrites) {
              onModified(file)
            }
            return
          case 'removed':
            onRemoved(file)
            return
        }
      })
    })
  }
  async createFolder(user: User, name: string, parent?: Folder): Promise<Folder> {
    const folder: FolderDoc = {
      folderId: parent?.id,
      name: name,
      favorite: false,
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const folderRef = await addDoc(collection(userDoc, 'folders'), folder)
    return {
      ...folder,
      id: folderRef.id,
      folders: [],
      notes: [],
      files: [],
    }
  }
  async createNote(user: User, folder: Folder) {
    const note: NoteDoc = {
      folderId: folder.id,
      content: '',
      favorite: false,
      logs: [],
      contentType: 'markdown',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notes = collection(userDoc, 'notes')
    return addDoc(notes, note)
  }

  async createFile(user: User, name: string, bytes: number, folder: Folder): Promise<File> {
    const file: FileDoc = {
      name: name,
      bytes: bytes,
      folderId: folder.id,
      createdAt: dayjs().toISOString(),
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const files = collection(userDoc, 'files')
    const fileRef = await addDoc(files, file)
    return {
      ...file,
      id: fileRef.id,
    }
  }

  async updateFolder(user: User, folder: Folder, { name, folderId, favorite }: UpdateFolderParams): Promise<Folder> {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const folderDoc = doc(userDoc, 'folders', folder.id)
    await updateDoc(folderDoc, {
      name: name,
      folderId: folderId,
      favorite: favorite,
    })
    return {
      ...folder,
      name: name ?? folder.name,
      folderId: folderId ?? folder.folderId,
      favorite: favorite ?? folder.favorite,
    }
  }
  async updateNote(
    user: User,
    note: Note,
    { content, folderId, favorite, contentType }: UpdateNoteParams
  ): Promise<Note> {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const noteDoc = doc(userDoc, 'notes', note.id)
    const updatedAt = dayjs().toISOString()
    const diff = content ? this.makePatchText(note.content, content) : undefined
    const logs = diff
      ? note.logs
          .concat({
            id: uuidv4(),
            diff: diff,
            updatedAt: note.updatedAt,
          })
          .slice(-100)
      : note.logs
    await updateDoc(noteDoc, {
      content: content,
      folderId: folderId,
      favorite: favorite,
      contentType: contentType,
      logs: logs,
      updatedAt: updatedAt,
    })
    return {
      ...note,
      content: content ?? note.content,
      folderId: folderId ?? note.folderId,
      favorite: favorite ?? note.favorite,
      updatedAt: updatedAt,
      logs: logs,
    }
  }
  async updateFile(user: User, file: File, { name, folderId }: UpdateFileParams): Promise<File> {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const folderDoc = doc(userDoc, 'files', file.id)
    await updateDoc(folderDoc, {
      name: name,
      folderId: folderId,
    })
    return {
      ...file,
      name: name ?? file.name,
      folderId: folderId ?? file.folderId,
    }
  }
  updateDeletedAtFolder(user: User, folder: Folder) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersCollection = collection(userDoc, 'folders')
    return updateDoc(doc(foldersCollection, folder.id), {
      deletedAt: dayjs().toISOString(),
    })
  }
  updateDeletedAtNote(user: User, note: Note) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notesCollection = collection(userDoc, 'notes')
    return updateDoc(doc(notesCollection, note.id), {
      deletedAt: dayjs().toISOString(),
    })
  }
  updateDeletedAtFile(user: User, file: File) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const filesCollection = collection(userDoc, 'files')
    return updateDoc(doc(filesCollection, file.id), {
      deletedAt: dayjs().toISOString(),
    })
  }
  resetDeletedAtFolder(user: User, folder: Folder) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersCollection = collection(userDoc, 'folders')
    return updateDoc(doc(foldersCollection, folder.id), {
      deletedAt: null,
    })
  }
  resetDeletedAtNote(user: User, note: Note) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notesCollection = collection(userDoc, 'notes')
    return updateDoc(doc(notesCollection, note.id), {
      deletedAt: null,
    })
  }
  resetDeletedAtFile(user: User, file: File) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const filesCollection = collection(userDoc, 'files')
    return updateDoc(doc(filesCollection, file.id), {
      deletedAt: null,
    })
  }
  deleteFolder(user: User, folder: Folder) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersCollection = collection(userDoc, 'folders')
    return deleteDoc(doc(foldersCollection, folder.id))
  }
  deleteNote(user: User, note: Note) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notesCollection = collection(userDoc, 'notes')
    return deleteDoc(doc(notesCollection, note.id))
  }
  deleteFile(user: User, file: File) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const filesCollection = collection(userDoc, 'files')
    return deleteDoc(doc(filesCollection, file.id))
  }

  private makePatchText(content1: string, content2: string): string {
    const diff = this.dmp.diff_main(content1, content2, true)
    this.dmp.diff_cleanupSemantic(diff)
    const patchList = this.dmp.patch_make(content1, content2, diff)
    return this.dmp.patch_toText(patchList)
  }
}
