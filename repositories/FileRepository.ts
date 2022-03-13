import { User } from '../store/session/models'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

export default class FileRepository {
  upload(user: User, fileId: string, file: File) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return uploadBytes(fileRef, file)
  }
  delete(user: User, fileId: string) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return deleteObject(fileRef)
  }
  url(user: User, fileId: string) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return getDownloadURL(fileRef)
  }
}
