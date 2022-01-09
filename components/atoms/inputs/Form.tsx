import { ReactNode } from 'react'

type FormProps = {
  children: ReactNode
  onSubmit: () => void
}

export default function Form({ children, onSubmit }: FormProps) {
  return <form onSubmit={onSubmit}>{children}</form>
}
