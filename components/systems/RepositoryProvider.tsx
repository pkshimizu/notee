import AuthRepository from '../../repositories/AuthRepository'
import { createContext, ReactNode } from 'react'

type RepositoryProps = {
  authRepository: AuthRepository
}

const authRepository = new AuthRepository()

export const Repository = createContext<RepositoryProps>({ authRepository: authRepository })

type RepositoryProviderProps = {
  children: ReactNode
}

export default function RepositoryProvider({ children }: RepositoryProviderProps) {
  return <Repository.Provider value={{ authRepository: authRepository }}>{children}</Repository.Provider>
}
