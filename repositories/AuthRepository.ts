import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from '@firebase/auth'
import { auth } from './firebase'
import { User } from '../store/session'

export default class AuthRepository {
  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  onChangeAuthState(handler: (user: User | undefined) => void) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedInUser: User = {
          uid: user.uid,
          name: user.displayName ?? undefined,
          email: user.email ?? undefined,
          imageUrl: user.photoURL ?? undefined,
        }
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
