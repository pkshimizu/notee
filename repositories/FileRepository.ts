import { User } from '../store/session/models'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

export default class FileRepository {
  upload(user: User, fileId: string, file: File) {
    const fileRef = ref(storage, `/users/${user.uid}/${fileId}`)
    return uploadBytes(fileRef, file)
  }
}
