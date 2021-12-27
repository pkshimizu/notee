import {
  Close,
  CreateNewFolder,
  Delete,
  Folder,
  Google,
  Logout,
  NoteAdd,
  Settings,
  TextSnippet,
} from '@mui/icons-material'
import { ElementType } from 'react'
import { SvgIcon } from '@mui/material'
import MuiMenuIcon from '@mui/icons-material/Menu'

type IconColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white' | 'black'

type IconProps = {
  color?: IconColor
}

type BaseIconProps = {
  icon: ElementType
} & IconProps

export function Icon({ color, icon }: BaseIconProps) {
  return <SvgIcon component={icon} sx={{ color: color }} />
}

export function CloseIcon(props: IconProps) {
  return <Icon {...props} icon={Close} />
}

export function CreateFolderIcon(props: IconProps) {
  return <Icon {...props} icon={CreateNewFolder} />
}

export function CreateNoteIcon(props: IconProps) {
  return <Icon {...props} icon={NoteAdd} />
}

export function DeleteIcon(props: IconProps) {
  return <Icon {...props} icon={Delete} />
}

export function FolderIcon(props: IconProps) {
  return <Icon {...props} icon={Folder} />
}

export function GoogleIcon(props: IconProps) {
  return <Icon {...props} icon={Google} />
}

export function LogoutIcon(props: IconProps) {
  return <Icon {...props} icon={Logout} />
}

export function MenuIcon(props: IconProps) {
  return <Icon {...props} icon={MuiMenuIcon} />
}

export function NoteIcon(props: IconProps) {
  return <Icon {...props} icon={TextSnippet} />
}

export function SettingsIcon(props: IconProps) {
  return <Icon {...props} icon={Settings} />
}
