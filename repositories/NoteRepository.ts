import { firestore } from './firebase'
import { addDoc, collection, doc, getDocs } from '@firebase/firestore'
import { User } from '../store/session'
import { Folder, FolderDoc, Note } from '../store/notes'
import dayjs from 'dayjs'

function makeTitle(content: string): string {
  if (content.length > 0) {
    return content.split('\n')[0]
  }
  return '名前無し'
}

export default class NoteRepository {
  async loadRootFolder(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const foldersDocs = await getDocs(collection(userDoc, 'folders'))
    if (foldersDocs.empty) {
      return undefined
    }
    const folders: { [key: string]: Folder } = {}
    foldersDocs.forEach((doc) => {
      folders[doc.id] = {
        id: doc.id,
        folderId: doc.data().folderId,
        name: doc.data().name,
        folders: [],
        notes: [],
      }
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
    const notes: Note[] = []
    notesDocs.forEach((doc) => {
      const data = doc.data()
      const content = data.content
      notes.push({
        id: doc.id,
        title: makeTitle(content),
        folderId: data.folderId,
        content: content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    })
    return notes
  }
  async createFolder(user: User, name: string, parent?: Folder): Promise<Folder> {
    const folder: FolderDoc = {
      folderId: parent?.id,
      name: name,
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
  createNote(user: User, folder: Folder) {
    const note: Note = {
      id: 'id',
      folderId: folder.id,
      title: '',
      content: '',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notes = collection(userDoc, 'notes')
    addDoc(notes, note)
  }
}
