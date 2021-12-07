import dayjs from 'dayjs'

export class Note {
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
  readonly notes: Note[]

  constructor(name: string, notes: Note[]) {
    this.name = name
    this.notes = notes
  }
}
