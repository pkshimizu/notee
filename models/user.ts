export class User {
  readonly uid: string
  readonly name: string | undefined
  readonly email: string | undefined
  readonly imageUrl: string | undefined

  constructor(uid: string, name?: string | null, email?: string | null, imageUrl?: string | null) {
    this.uid = uid
    this.name = name ?? undefined
    this.email = email ?? undefined
    this.imageUrl = imageUrl ?? undefined
  }
}
