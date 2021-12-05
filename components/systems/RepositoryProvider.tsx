import AuthRepository from '../../repositories/AuthRepository'
import { createContext, ReactNode } from 'react'
import MemoRepository from "../../repositories/MemoRepository";

type RepositoryProps = {
  authRepository: AuthRepository
  memoRepository: MemoRepository
}

const authRepository = new AuthRepository()
const memoRepository = new MemoRepository()

export const Repository = createContext<RepositoryProps>({
  authRepository: authRepository,
  memoRepository: memoRepository
})

type RepositoryProviderProps = {
  children: ReactNode
}

export default function RepositoryProvider({ children }: RepositoryProviderProps) {
  return <Repository.Provider value={{
    authRepository: authRepository,
    memoRepository: memoRepository
  }}>
    {children}
  </Repository.Provider>
}
