import { Provider } from 'react-redux'
import store, { persistor } from '../../store'
import { PersistGate } from 'redux-persist/integration/react'
import { Component } from '../../types/react'

type StoreProps = {
  children: Component
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
