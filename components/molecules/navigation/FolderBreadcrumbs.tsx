import { Folder } from '../../../store/notes'
import Breadcrumbs from '../../atoms/navigation/Breadcrumbs'
import Link from '../../atoms/navigation/Link'

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
  return (
    <Breadcrumbs>
      {parentFolders(folders, folder).map((folder) => (
        <Link key={folder.id} href={`/notes/${folder.id}`}>
          {folder.name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
