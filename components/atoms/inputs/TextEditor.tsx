import { Ace } from 'ace-builds'
import dynamic from 'next/dynamic'

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace')
    await import('ace-builds/src-noconflict/mode-javascript')
    await import('ace-builds/src-noconflict/mode-java')
    await import('ace-builds/src-noconflict/mode-python')
    await import('ace-builds/src-noconflict/mode-xml')
    await import('ace-builds/src-noconflict/mode-ruby')
    await import('ace-builds/src-noconflict/mode-sass')
    await import('ace-builds/src-noconflict/mode-markdown')
    await import('ace-builds/src-noconflict/mode-mysql')
    await import('ace-builds/src-noconflict/mode-json')
    await import('ace-builds/src-noconflict/mode-html')
    await import('ace-builds/src-noconflict/mode-handlebars')
    await import('ace-builds/src-noconflict/mode-golang')
    await import('ace-builds/src-noconflict/mode-csharp')
    await import('ace-builds/src-noconflict/mode-elixir')
    await import('ace-builds/src-noconflict/mode-typescript')
    await import('ace-builds/src-noconflict/mode-css')
    await import('ace-builds/src-noconflict/keybinding-emacs')
    await import('ace-builds/src-noconflict/keybinding-sublime')
    await import('ace-builds/src-noconflict/keybinding-vim')
    await import('ace-builds/src-noconflict/keybinding-vscode')
    await import('ace-builds/src-noconflict/theme-monokai')
    await import('ace-builds/src-noconflict/theme-github')
    await import('ace-builds/src-noconflict/theme-tomorrow')
    await import('ace-builds/src-noconflict/theme-kuroir')
    await import('ace-builds/src-noconflict/theme-twilight')
    await import('ace-builds/src-noconflict/theme-xcode')
    await import('ace-builds/src-noconflict/theme-textmate')
    await import('ace-builds/src-noconflict/theme-solarized_dark')
    await import('ace-builds/src-noconflict/theme-solarized_light')
    await import('ace-builds/src-noconflict/theme-terminal')

    return ace
  },
  { ssr: false }
)

export type ContentType =
  | 'csharp'
  | 'css'
  | 'elixir'
  | 'golang'
  | 'html'
  | 'java'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'mysql'
  | 'python'
  | 'ruby'
  | 'sass'
  | 'typescript'
  | 'xml'

export type EditorTheme =
  | 'monokai'
  | 'github'
  | 'tomorrow'
  | 'kuroir'
  | 'twilight'
  | 'xcode'
  | 'textmate'
  | 'solarized_dark'
  | 'solarized_light'
  | 'terminal'

export type KeyBinding = 'emacs' | 'sublime' | 'vim' | 'vscode'

type TextEditorProps = {
  content: string
  width?: string
  height?: string
  fontSize?: number
  mode?: ContentType
  theme?: EditorTheme
  keyBinding?: KeyBinding
  tabSize?: number
  readOnly?: boolean
  onLoad?: (editor: Ace.Editor) => void
  onChangeContent?: (content: string) => void
}

export default function TextEditor({
  content,
  width = '100%',
  height = '100%',
  fontSize = 14,
  mode = 'markdown',
  theme = 'textmate',
  keyBinding = 'vim',
  tabSize = 2,
  readOnly = false,
  onLoad,
  onChangeContent,
}: TextEditorProps) {
  return (
    <AceEditor
      value={content}
      width={width}
      height={height}
      fontSize={fontSize}
      mode={mode}
      theme={theme}
      keyboardHandler={keyBinding}
      showPrintMargin
      showGutter
      highlightActiveLine
      setOptions={{
        showLineNumbers: true,
        tabSize,
        wrap: true,
        autoScrollEditorIntoView: true,
      }}
      editorProps={{
        $blockScrolling: true,
      }}
      debounceChangePeriod={1000}
      readOnly={readOnly}
      focus
      onLoad={onLoad}
      onChange={onChangeContent}
    />
  )
}
