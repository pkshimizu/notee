import { User } from '../store/session/models'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

export default class FileRepository {
  upload(user: User, uuid: string, file: File) {
    const fileRef = ref(storage, `/users/${user.uid}/${uuid}`)
    return uploadBytes(fileRef, file)
  }
  delete(user: User, uuid: string) {
    const fileRef = ref(storage, `/users/${user.uid}/${uuid}`)
    return deleteObject(fileRef)
  }
  url(user: User, uuid: string) {
    const fileRef = ref(storage, `/users/${user.uid}/${uuid}`)
    return getDownloadURL(fileRef)
  }
}
