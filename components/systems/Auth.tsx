import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Repository } from './RepositoryProvider'
import { User } from '../../repositories/AuthRepository'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  useEffect(() => {
    authRepository.onChangeAuthState((user) => {
      if (currentUser === undefined && user === undefined) {
        return
      }
      setCurrentUser(user ?? undefined)
      if (user === undefined) {
        router.push('/login')
      }
    })
  }, [authRepository, currentUser, router])

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
}
