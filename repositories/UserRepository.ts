import { firestore } from './firebase'
import { doc, DocumentSnapshot, getDoc, onSnapshot, setDoc } from '@firebase/firestore'
import { Settings, User } from '../store/session/models'

type UserEventListener = (settings: Settings) => void

const docToSettings = (doc: DocumentSnapshot): Settings | undefined => {
  const settings = doc.data()?.settings
  if (settings) {
    return {
      editor: {
        keyBinding: settings.editor.keyBinding,
        theme: settings.editor.theme,
      },
    }
  }
  return undefined
}

export default class UserRepository {
  async loadUser(user: User) {
    const userDoc = await getDoc(doc(firestore, 'users', user.uid))
    return userDoc.exists()
  }
  async createUser(user: User) {
    await setDoc(doc(firestore, 'users', user.uid), {})
    return await getDoc(doc(firestore, 'users', user.uid))
  }
  onSnapshotUser(user: User, onModified: UserEventListener) {
    const userDoc = doc(firestore, 'users', user.uid)
    onSnapshot(userDoc, (doc) => {
      const settings = docToSettings(doc)
      if (settings) {
        onModified(settings)
      }
    })
  }
  async updateSettings(user: User, settings: Settings) {
    await setDoc(doc(firestore, 'users', user.uid), { settings: settings })
  }
}
