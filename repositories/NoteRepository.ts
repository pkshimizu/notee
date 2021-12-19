import { firestore } from './firebase'
import { addDoc, collection, doc } from '@firebase/firestore'
import { User } from '../store/session'
import { Note } from '../store/notes'
import dayjs from 'dayjs'

export default class NoteRepository {
  create(user: User) {
    const note: Note = {
      id: 'id',
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
