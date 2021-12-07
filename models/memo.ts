import dayjs from 'dayjs'

export class Memo {
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string

  constructor(
    content: string = '',
    createdAt: string = dayjs().toISOString(),
    updatedAt: string = dayjs().toISOString()
  ) {
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  toJson() {
    return {
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

export class Folder {
  readonly name: string
  readonly memos: Memo[]

  constructor(name: string, memos: Memo[]) {
    this.name = name
    this.memos = memos
  }
}
