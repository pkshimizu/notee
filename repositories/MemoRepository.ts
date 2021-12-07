import { firestore } from './firebase'
import { addDoc, collection, doc } from '@firebase/firestore'
import { Memo } from '../models/memo'
import { User } from '../models/user'

export default class MemoRepository {
  create(user: User) {
    const memo = new Memo()
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const memos = collection(userDoc, 'memos')
    addDoc(memos, memo.toJson())
  }
}
