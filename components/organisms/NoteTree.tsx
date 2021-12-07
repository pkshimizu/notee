import TreeView from '../atoms/navigation/TreeView'
import TreeItem from '../atoms/navigation/TreeItem'
import FolderIcon from '../atoms/display/icons/FolderIcon'
import NoteIcon from '../atoms/display/icons/NoteIcon'
import {Folder} from "../../models/note";

type NoteTreeProps = {
  folder: Folder
}

export default function NoteTree({}: NoteTreeProps) {
  return (
    <TreeView>
      <TreeItem id={'item1'} label={'フォルダー１'} icon={<FolderIcon />}>
        <TreeItem id={'item4'} icon={<NoteIcon />} label={'メモ１'} />
      </TreeItem>
      <TreeItem id={'item2'} label={'フォルダー２'} icon={<FolderIcon />} />
      <TreeItem id={'item3'} label={'フォルダー３'} icon={<FolderIcon />} />
    </TreeView>
  )
}
