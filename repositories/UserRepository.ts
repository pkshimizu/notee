import { firestore } from './firebase'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { User } from '../store/session'

export default class UserRepository {
  async loadUser(user: User) {
    const userDoc = await getDoc(doc(firestore, 'users', user.uid))
    return userDoc.exists()
  }
  async createUser(user: User) {
    await setDoc(doc(firestore, 'users', user.uid), {})
    return await getDoc(doc(firestore, 'users', user.uid))
  }
}
