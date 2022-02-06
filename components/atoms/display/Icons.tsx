import {
  ArrowBackIosNew,
  Check,
  Close,
  CreateNewFolder,
  Delete,
  DeleteForever,
  DriveFileMove,
  Folder,
  GitHub,
  Google,
  History,
  Info,
  Logout,
  NavigateBefore,
  NavigateNext,
  NoteAdd,
  OpenInNew,
  RestoreFromTrash,
  Search,
  Settings,
  Star,
  StarOutline,
  TextSnippet,
  ViewSidebar,
} from '@mui/icons-material'
import { ElementType } from 'react'
import { SvgIcon } from '@mui/material'
import MuiMenuIcon from '@mui/icons-material/Menu'

export type IconColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white' | 'black'

type IconProps = {
  color?: IconColor
}

type BaseIconProps = {
  icon: ElementType
} & IconProps

export function Icon({ color, icon }: BaseIconProps) {
  return <SvgIcon component={icon} sx={{ color: color }} />
}

export function ApplyIcon(props: IconProps) {
  return <Icon {...props} icon={Check} />
}

export function BackIcon(props: IconProps) {
  return <Icon {...props} icon={ArrowBackIosNew} />
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
  return <Icon {...props} icon={DeleteForever} />
}

export function FavoriteIcon(props: IconProps) {
  return <Icon {...props} icon={Star} />
}

export function FavoriteOutlinedIcon(props: IconProps) {
  return <Icon {...props} icon={StarOutline} />
}

export function FolderIcon(props: IconProps) {
  return <Icon {...props} icon={Folder} />
}

export function GitHubIcon(props: IconProps) {
  return <Icon {...props} icon={GitHub} />
}

export function GoogleIcon(props: IconProps) {
  return <Icon {...props} icon={Google} />
}

export function InfoIcon(props: IconProps) {
  return <Icon {...props} icon={Info} />
}

export function LogIcon(props: IconProps) {
  return <Icon {...props} icon={History} />
}

export function LogoutIcon(props: IconProps) {
  return <Icon {...props} icon={Logout} />
}

export function MenuIcon(props: IconProps) {
  return <Icon {...props} icon={MuiMenuIcon} />
}

export function MoveIcon(props: IconProps) {
  return <Icon {...props} icon={DriveFileMove} />
}

export function NextIcon(props: IconProps) {
  return <Icon {...props} icon={NavigateNext} />
}

export function NoteIcon(props: IconProps) {
  return <Icon {...props} icon={TextSnippet} />
}

export function OpenIcon(props: IconProps) {
  return <Icon {...props} icon={OpenInNew} />
}

export function PrevIcon(props: IconProps) {
  return <Icon {...props} icon={NavigateBefore} />
}

export function RestoreIcon(props: IconProps) {
  return <Icon {...props} icon={RestoreFromTrash} />
}

export function SettingsIcon(props: IconProps) {
  return <Icon {...props} icon={Settings} />
}

export function SidebarIcon(props: IconProps) {
  return <Icon {...props} icon={ViewSidebar} />
}

export function SearchIcon(props: IconProps) {
  return <Icon {...props} icon={Search} />
}

export function TrashIcon(props: IconProps) {
  return <Icon {...props} icon={Delete} />
}
