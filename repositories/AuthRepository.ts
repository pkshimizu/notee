import {
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from '@firebase/auth'
import { auth } from './firebase'
import { User } from '../store/session'

export default class AuthRepository {
  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  loginWithGitHub() {
    const provider = new GithubAuthProvider()
    signInWithRedirect(auth, provider)
  }

  async getUser(): Promise<User | undefined> {
    const result = await getRedirectResult(auth)
    const user = result?.user
    console.log('getUser', user)
    if (user) {
      return {
        uid: user.uid,
        name: user.displayName ?? undefined,
        email: user.email ?? undefined,
        imageUrl: user.photoURL ?? undefined,
      }
    }
    return undefined
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
