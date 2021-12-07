import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import store from '../../store'

type StoreProps = {
  children: ReactNode
}

export default function Store({ children }: StoreProps) {
  return <Provider store={store}>{children}</Provider>
}
