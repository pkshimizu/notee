import TreeView from '../atoms/navigation/TreeView'
import { Folder } from '../../repositories/MemoRepository'
import TreeItem from '../atoms/navigation/TreeItem'
import FolderIcon from '../atoms/display/icons/FolderIcon'
import MemoIcon from '../atoms/display/icons/MemoIcon'

type MemoTreeProps = {
  folder: Folder
}

export default function MemoTree({}: MemoTreeProps) {
  return (
    <TreeView>
      <TreeItem id={'item1'} label={'フォルダー１'} icon={<FolderIcon />}>
        <TreeItem id={'item4'} icon={<MemoIcon />} label={'メモ１'} />
      </TreeItem>
      <TreeItem id={'item2'} label={'フォルダー２'} icon={<FolderIcon />} />
      <TreeItem id={'item3'} label={'フォルダー３'} icon={<FolderIcon />} />
    </TreeView>
  )
}
