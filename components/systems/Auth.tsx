import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Repository } from './RepositoryProvider'
import { User } from '../../repositories/AuthRepository'

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

  useEffect(() => {
    authRepository.onChangeAuthState((user) => {
      setCurrentUser(user ?? undefined)
    })
  }, [authRepository])

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
}
