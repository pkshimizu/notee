import { ReactNode } from 'react'

type FormProps = {
  children: ReactNode
}

export default function Form({ children }: FormProps) {
  return <form>{children}</form>
}
