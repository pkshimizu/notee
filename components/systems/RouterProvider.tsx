import { createContext, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/router'

type RouterProps = {
  go: (path: string, params?: { [key: string]: string }) => void
}

export const Router = createContext<RouterProps>({ go: (path, params) => {} })

type RouterProviderProps = {
  children: ReactNode
}

export default function RouterProvider({ children }: RouterProviderProps) {
  const router = useRouter()
  const go = useCallback((path, params) => {
    router.push(path, params, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Router.Provider value={{ go: go }}>{children}</Router.Provider>
}
