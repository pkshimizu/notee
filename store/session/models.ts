import { EditorTheme, KeyBinding } from '../../components/atoms/inputs/TextEditor'

export type User = {
  uid: string
  name: string | undefined
  email: string | undefined
  imageUrl: string | undefined
}

export type Settings = {
  editor: {
    keyBinding: KeyBinding
    theme: EditorTheme
  }
}
