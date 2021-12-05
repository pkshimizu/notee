import {firestore} from "./firebase";
import {addDoc, collection, doc} from "@firebase/firestore";
import {User} from "./AuthRepository";
import dayjs from "dayjs";

export class Memo {
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string

  constructor(content: string = "", createdAt: string = dayjs().toISOString(), updatedAt: string = dayjs().toISOString()) {
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  toJson() {
    return {
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

export default class MemoRepository {
  create(user: User) {
    const memo = new Memo()
    const userDoc = doc(firestore, `/users/${user.uid}`)
    const memos = collection(userDoc, 'memos')
    addDoc(memos, memo.toJson())
  }
}