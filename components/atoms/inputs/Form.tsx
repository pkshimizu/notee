import { Component } from '../../../types/react'

type FormProps = {
  children: Component
  onSubmit: () => void
}

export default function Form({ children, onSubmit }: FormProps) {
  return <form onSubmit={onSubmit}>{children}</form>
}
