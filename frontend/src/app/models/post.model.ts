import { MiniUser } from './user.model'

export interface Post {
  id: string
  imgUrls: string[]
  by: MiniUser
  location: Location | null
  likeSum: number
  commentSum: number
  createdAt: Date
  tags: string[]
}

export interface Location {
  id: number
  lat: number
  lng: number
  name: string
}
