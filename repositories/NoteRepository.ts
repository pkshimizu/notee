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
import { User } from '../store/session'
import { Folder, FolderDoc, Note, NoteDoc } from '../store/notes'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

function makeTitle(content: string): string {
  if (content.length > 0) {
    return content.split('\n')[0]
  }
  return '名前無し'
}

type FolderEventListener = (folder: Folder) => void
type NoteEventListener = (note: Note) => void

const docToFolder = (doc: QueryDocumentSnapshot<DocumentData>): Folder => {
  return {
    id: doc.id,
    folderId: doc.data().folderId,
    name: doc.data().name,
    favorite: doc.data().favorite,
    folders: [],
    notes: [],
  }
}
const docToNote = (doc: QueryDocumentSnapshot<DocumentData>): Note => {
  const data = doc.data()
  const content = data.content
  return {
    id: doc.id,
    title: makeTitle(content),
    folderId: data.folderId,
    content: content,
    favorite: doc.data().favorite,
    logs: data.logs ?? [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

const noteToDoc = (note: Note): NoteDoc => {
  return {
    folderId: note.folderId,
    content: note.content,
    favorite: note.favorite,
    logs: note.logs,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
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
}

export default class NoteRepository {
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
  async loadRootFolder(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersDocs = await getDocs(collection(userDoc, 'folders'))
    if (foldersDocs.empty) {
      return undefined
    }
    const folders: { [key: string]: Folder } = {}
    foldersDocs.forEach((doc) => {
      folders[doc.id] = docToFolder(doc)
    })
    Object.values(folders).map((folder) => {
      if (folder.folderId) {
        const parent = folders[folder.folderId]
        if (parent) {
          parent.folders.push(folder)
        }
      }
    })
    return Object.values(folders).find((folder) => folder.folderId === undefined)
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
    }
  }
  async createNote(user: User, folder: Folder) {
    const note: NoteDoc = {
      folderId: folder.id,
      content: '',
      favorite: false,
      logs: [],
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notes = collection(userDoc, 'notes')
    return addDoc(notes, note)
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
  async updateNote(user: User, note: Note, { content, folderId, favorite }: UpdateNoteParams): Promise<Note> {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const noteDoc = doc(userDoc, 'notes', note.id)
    const updatedAt = dayjs().toISOString()
    const logs = content
      ? note.logs
          .concat({
            id: uuidv4(),
            content: note.content,
            updatedAt: note.updatedAt,
          })
          .slice(-100)
      : note.logs
    await updateDoc(noteDoc, {
      content: content,
      folderId: folderId,
      favorite: favorite,
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
  deleteFolder(user: User, folder: Folder) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersCollection = collection(userDoc, 'folders')
    return deleteDoc(doc(foldersCollection, folder.id))
  }
  async deleteNote(user: User, note: Note) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notesCollection = collection(userDoc, 'notes')
    await deleteDoc(doc(notesCollection, note.id))
  }
}
