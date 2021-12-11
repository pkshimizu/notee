import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-sass'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-handlebars'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/mode-elixir'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/keybinding-emacs'
import 'ace-builds/src-noconflict/keybinding-sublime'
import 'ace-builds/src-noconflict/keybinding-vim'
import 'ace-builds/src-noconflict/keybinding-vscode'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-terminal'
import { Ace } from 'ace-builds'

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
      onLoad={onLoad}
      onChange={onChangeContent}
    />
  )
}
