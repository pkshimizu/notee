import { firestore } from './firebase'
import { addDoc, collection, doc } from '@firebase/firestore'
import { Note } from '../models/note'
import { User } from '../models/user'

export default class NoteRepository {
  create(user: User) {
    const note = new Note('id')
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const notes = collection(userDoc, 'notes')
    addDoc(notes, note.toJson())
  }
}
