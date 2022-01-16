import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import store, { persistor } from '../../store'
import { PersistGate } from 'redux-persist/integration/react'

type StoreProps = {
  children: ReactNode
}

export default function Store({ children }: StoreProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
