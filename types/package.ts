export interface Package {
  id: string
  title: string
  destination: string
  duration: string
  price: number
  highlights: string[]
  image: string
  isLimited: boolean
  createdAt?: string
  updatedAt?: string
}
