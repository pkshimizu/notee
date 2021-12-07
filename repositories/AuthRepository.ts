import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from '@firebase/auth'
import { auth } from './firebase'
import { User } from '../models/user'

export default class AuthRepository {
  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  onChangeAuthState(handler: (user: User | undefined) => void) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedInUser = new User(user.uid, user.displayName, user.email, user.photoURL)
        handler(loggedInUser)
      } else {
        handler(undefined)
      }
    })
  }

  logout() {
    signOut(auth)
  }
}
