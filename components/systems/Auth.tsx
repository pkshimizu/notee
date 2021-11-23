import { createContext, ReactNode, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from '../../services/firebase'

type AuthContextProps = {
  currentUser: User | undefined
}

export const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ?? undefined)
    })
  }, [])

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
}
