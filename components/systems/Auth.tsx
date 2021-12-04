import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Repository } from './RepositoryProvider'
import { User } from '../../repositories/AuthRepository'
import { Router } from './RouterProvider'

type AuthContextProps = {
  currentUser: User | undefined
}

export const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const { authRepository } = useContext(Repository)
  const { go } = useContext(Router)

  useEffect(() => {
    authRepository.onChangeAuthState((user) => {
      setCurrentUser(user ?? undefined)
    })
  }, [authRepository])

  useEffect(() => {
    if (currentUser === undefined) {
      go('/login')
    }
  }, [currentUser, go])

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
}
