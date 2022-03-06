import SettingsLayout from '../../components/templates/SettingsLayout'
import { useCallback, useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { FlexColumn, FlexRow } from '../../components/atoms/layout/Flex'
import Label from '../../components/atoms/display/Label'
import Divider from '../../components/atoms/display/Divider'
import { useDispatch, useSelector } from 'react-redux'
import SessionActions from '../../store/session/actions'
import { EditorTheme, KeyBinding } from '../../components/atoms/inputs/TextEditor'
import Button from '../../components/atoms/inputs/Button'
import Image from '../../components/atoms/display/Image'
import SessionSelectors from '../../store/session/selectors'

const variant = (settingValue: string, value: string) => {
  if (settingValue === value) {
    return 'contained'
  }

  return 'outlined'
}

export default function Editor() {
  const { setTitle } = useTitle()
  const editorSettings = useSelector(SessionSelectors.editorSettings)
  useEffect(() => {
    setTitle({ value: 'Editor Settings' })
  }, [setTitle])
  const dispatch = useDispatch()
  const handleKeybinding = useCallback(
    (value: KeyBinding) => {
      dispatch(SessionActions.updateKeyBinding({ keyBinding: value }))
    },
    [dispatch]
  )
  const handleTheme = useCallback(
    (value: string) => {
      dispatch(SessionActions.updateTheme({ theme: value as EditorTheme }))
    },
    [dispatch]
  )

  return (
    <FlexColumn>
      <Label variant={'title'} text={{ value: 'Editor' }} />
      <Divider />
      <Label variant={'subtitle'} text={{ value: 'Keybinding' }} />
      <Button variant={variant(editorSettings.keyBinding, 'vscode')} onClick={() => handleKeybinding('vscode')}>
        <FlexRow align={'center'}>
          <Image url={'/images/keybinding/vscode.png'} alt={'vscode'} width={64} height={64} />
          <Label text={{ value: 'Visual Studio Code' }} />
        </FlexRow>
      </Button>
      <Button variant={variant(editorSettings.keyBinding, 'sublime')} onClick={() => handleKeybinding('sublime')}>
        <FlexRow align={'center'}>
          <Image url={'/images/keybinding/sublime.png'} alt={'sublime'} width={64} height={64} />
          <Label text={{ value: 'Sublime' }} />
        </FlexRow>
      </Button>
      <Button variant={variant(editorSettings.keyBinding, 'vim')} onClick={() => handleKeybinding('vim')}>
        <FlexRow align={'center'}>
          <Image url={'/images/keybinding/vim.png'} alt={'vim'} width={64} height={64} />
          <Label text={{ value: 'Vim' }} />
        </FlexRow>
      </Button>
      <Button variant={variant(editorSettings.keyBinding, 'emacs')} onClick={() => handleKeybinding('emacs')}>
        <FlexRow align={'center'}>
          <Image url={'/images/keybinding/emacs.png'} alt={'emacs'} width={64} height={64} />
          <Label text={{ value: 'Emacs' }} />
        </FlexRow>
      </Button>
      <Label variant={'subtitle'} text={{ value: 'Theme' }} />
      <FlexRow>
        <Button variant={variant(editorSettings.theme, 'monokai')} onClick={() => handleTheme('monokai')}>
          <Image url={'/images/theme/monokai.png'} alt={'monokai'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'github')} onClick={() => handleTheme('github')}>
          <Image url={'/images/theme/github.png'} alt={'github'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'tomorrow')} onClick={() => handleTheme('tomorrow')}>
          <Image url={'/images/theme/tomorrow.png'} alt={'tomorrow'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'kuroir')} onClick={() => handleTheme('kuroir')}>
          <Image url={'/images/theme/kuroir.png'} alt={'kuroir'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'twilight')} onClick={() => handleTheme('twilight')}>
          <Image url={'/images/theme/twilight.png'} alt={'twilight'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'xcode')} onClick={() => handleTheme('xcode')}>
          <Image url={'/images/theme/xcode.png'} alt={'xcode'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'textmate')} onClick={() => handleTheme('textmate')}>
          <Image url={'/images/theme/textmate.png'} alt={'textmate'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'solarized_dark')} onClick={() => handleTheme('solarized_dark')}>
          <Image url={'/images/theme/solarized_dark.png'} alt={'solarized_dark'} width={128} height={128} />
        </Button>
        <Button
          variant={variant(editorSettings.theme, 'solarized_light')}
          onClick={() => handleTheme('solarized_light')}
        >
          <Image url={'/images/theme/solarized_light.png'} alt={'solarized_light'} width={128} height={128} />
        </Button>
        <Button variant={variant(editorSettings.theme, 'terminal')} onClick={() => handleTheme('terminal')}>
          <Image url={'/images/theme/terminal.png'} alt={'terminal'} width={128} height={128} />
        </Button>
      </FlexRow>
    </FlexColumn>
  )
}

Editor.layout = SettingsLayout
Editor.login = 'required'
