export type Post = {
  id: string,
  userid: string,
  caption: string,
  flowers: FlowerTypes[],
  date: number
}

export type User = {
  id: string,
  username: string,
  email: string,
  role: UserRole,
  bio: string,
  dateJoined: number
}

export type PostLike = {
  postid: string,
  userid: string,
}

export enum FlowerTypes {
  flowerType1 = "Flower Type 1",
  flowerType2 = "Flower Type 2",
}

export enum UserRole {
  admin = "admin",
  user = "user",
}