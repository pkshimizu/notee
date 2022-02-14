import { ReactElement } from 'react'

type FormProps = {
  children: ReactElement | ReactElement[]
  onSubmit: () => void
}

export default function Form({ children, onSubmit }: FormProps) {
  return <form onSubmit={onSubmit}>{children}</form>
}
