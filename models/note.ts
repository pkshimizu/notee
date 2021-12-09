import dayjs from 'dayjs'

export class Note {
  readonly id: string
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string

  constructor(
    id: string,
    content: string = '',
    createdAt: string = dayjs().toISOString(),
    updatedAt: string = dayjs().toISOString()
  ) {
    this.id = id
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
  readonly id: string
  readonly name: string
  readonly folders: Folder[]
  readonly notes: Note[]

  constructor(id: string, name: string, folders: Folder[] = [], notes: Note[] = []) {
    this.id = id
    this.name = name
    this.folders = folders
    this.notes = notes
  }
}
