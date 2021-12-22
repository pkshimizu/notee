import { firestore } from './firebase'
import { addDoc, collection, doc, getDocs } from '@firebase/firestore'
import { User } from '../store/session'
import { Folder, FolderDoc, Note } from '../store/notes'
import dayjs from 'dayjs'

export default class NoteRepository {
  async loadRootFolder(user: User) {
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const folderDocs = await getDocs(collection(userDoc, 'folders'))
    if (folderDocs.empty) {
      return undefined
    }
    const folders: { [key: string]: Folder } = {}
    folderDocs.forEach((doc) => {
      folders[doc.id] = {
        id: doc.id,
        parentId: doc.data().parentId,
        name: doc.data().name,
        folders: [],
        notes: [],
      }
    })
    Object.values(folders).map((folder) => {
      if (folder.parentId) {
        const parent = folders[folder.parentId]
        if (parent) {
          parent.folders.push(folder)
        }
      }
    })
    return Object.values(folders).find((folder) => folder.parentId === undefined)
  }
  async createFolder(user: User, name: string, parent?: Folder) {
    const folder: FolderDoc = {
      parentId: parent?.id,
      name: name,
    }
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const folderRef = await addDoc(collection(userDoc, 'folders'), folder)
  }
  createNote(user: User, folder: Folder) {
    const note: Note = {
      id: 'id',
      parentId: folder.id,
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
