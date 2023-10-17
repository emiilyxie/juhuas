export type Post = {
  id: string,
  userid: string,
  caption: string,
  flowers: FlowerTypes[],
  likes: string[],
  comments: Comment[],
  date: number,
}

export type User = {
  id: string,
  username: string,
  email: string,
  role: UserRole,
  bio: string,
  dateJoined: number
}

export type Comment = {
  id: string,
  postid: string,
  userid: string,
  message: string,
  date: number,
}

export enum FlowerTypes {
  flowerType1 = "Flower Type 1",
  flowerType2 = "Flower Type 2",
}

export enum UserRole {
  admin = "admin",
  user = "user",
}