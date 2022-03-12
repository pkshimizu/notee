import { User } from '../store/session/models'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

export default class FileRepository {
  upload(user: User, fileId: string, file: File) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return uploadBytes(fileRef, file)
  }
  url(user: User, fileId: string) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return getDownloadURL(fileRef)
  }
}
