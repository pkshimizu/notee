import { Folder } from '../../../store/notes/models'
import Breadcrumbs from '../../atoms/navigation/Breadcrumbs'
import Link from '../../atoms/navigation/Link'
import { usePath } from '../../../hooks/usePath'
import Label from '../../atoms/display/Label'

type FolderBreadcrumbsProps = {
  folders: Folder[]
  folder: Folder
}

function parentFolders(folders: Folder[], folder?: Folder): Folder[] {
  if (folder) {
    const parentFolder = folders.find((item) => item.id === folder.folderId)

    return parentFolders(folders, parentFolder).concat(folder)
  }

  return []
}

export default function FolderBreadcrumbs({ folders, folder }: FolderBreadcrumbsProps) {
  const { folders: foldersPath } = usePath()

  return (
    <Breadcrumbs>
      {parentFolders(folders, folder).map((folder) => (
        <Link key={folder.id} href={foldersPath(folder.id)}>
          <Label text={folder.name} plain />
        </Link>
      ))}
    </Breadcrumbs>
  )
}
