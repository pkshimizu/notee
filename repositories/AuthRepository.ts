import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from '@firebase/auth'
import { auth } from './firebase'

export class User {
  readonly name: string | undefined
  readonly email: string | undefined
  readonly imageUrl: string | undefined

  constructor(name?: string | null, email?: string | null, imageUrl?: string | null) {
    this.name = name ?? undefined
    this.email = email ?? undefined
    this.imageUrl = imageUrl ?? undefined
  }
}

export default class AuthRepository {
  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  onChangeAuthState(handler: (user: User | undefined) => void) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedInUser = new User(user.displayName, user.email, user.photoURL)
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
