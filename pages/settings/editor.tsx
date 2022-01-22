import SettingsLayout from '../../components/templates/SettingsLayout'
import { useCallback, useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { FlexColumn } from '../../components/atoms/layout/Flex'
import Label from '../../components/atoms/display/Label'
import Divider from '../../components/atoms/display/Divider'
import ToggleButton from '../../components/atoms/inputs/ToggleButton'
import { useDispatch, useSelector } from 'react-redux'
import { editorSettingsSelector } from '../../store/session/selectors'
import { updateKeyBinding, updateTheme } from '../../store/session/actions'
import { EditorTheme, KeyBinding } from '../../components/atoms/inputs/TextEditor'

export default function Editor() {
  const { setTitle } = useTitle()
  const editorSettings = useSelector(editorSettingsSelector)
  useEffect(() => {
    setTitle('Editor settings')
  }, [setTitle])
  const dispatch = useDispatch()
  const handleKeybinding = useCallback(
    (value: string) => {
      dispatch(updateKeyBinding({ keyBinding: value as KeyBinding }))
    },
    [dispatch]
  )
  const handleTheme = useCallback(
    (value: string) => {
      dispatch(updateTheme({ theme: value as EditorTheme }))
    },
    [dispatch]
  )

  return (
    <FlexColumn>
      <Label variant={'title'}>Editor</Label>
      <Divider />
      <Label variant={'subtitle'}>Keybinding</Label>
      <ToggleButton
        value={editorSettings.keyBinding}
        items={[
          {
            value: 'vscode',
            content: <Label>Visual Studio Code</Label>,
          },
          {
            value: 'sublime',
            content: <Label>Sublime</Label>,
          },
          {
            value: 'vim',
            content: <Label>Vim</Label>,
          },
          {
            value: 'emacs',
            content: <Label>Emacs</Label>,
          },
        ]}
        vertical
        onChange={handleKeybinding}
      />
      <Label variant={'subtitle'}>Theme</Label>
      <ToggleButton
        value={editorSettings.theme}
        items={[
          {
            value: 'monokai',
            content: <Label>monokai</Label>,
          },
          {
            value: 'github',
            content: <Label>GitHub</Label>,
          },
          {
            value: 'tomorrow',
            content: <Label>Tomorrow</Label>,
          },
          {
            value: 'kuroir',
            content: <Label>kuroir</Label>,
          },
          {
            value: 'twilight',
            content: <Label>twilight</Label>,
          },
          {
            value: 'xcode',
            content: <Label>xcode</Label>,
          },
          {
            value: 'textmate',
            content: <Label>textmate</Label>,
          },
          {
            value: 'solarized_dark',
            content: <Label>solarized_dark</Label>,
          },
          {
            value: 'solarized_light',
            content: <Label>solarized_light</Label>,
          },
          {
            value: 'terminal',
            content: <Label>terminal</Label>,
          },
        ]}
        vertical
        onChange={handleTheme}
      />
    </FlexColumn>
  )
}

Editor.layout = SettingsLayout