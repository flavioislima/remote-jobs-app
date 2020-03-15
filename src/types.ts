import { ImageProps } from 'react-native'

export interface JobType {
  id: string
  position: string | undefined
  company: string
  description: string
  url: string
  date: string
  tags?: string[]
  dateFormated?: string
  index?: number
  salary?: string
  isFavorite?: boolean
  image?: any
  logo?: any
  company_logo?: any
}

export interface ContextType {
  data: JobType[]
  keys: string[]
  refreshing: boolean
  error: boolean
  refresh?: () => void
  handleFavorites?: (data: JobType) => void
  handleClearFavorites?: () => void
}

export interface handleFavorites {
  add: () => void
  clear: (keys: string[]) => void
}
