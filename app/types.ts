// Types for the Remote Work app

export interface JobType {
  id: string
  position: string | undefined
  company: string
  description: string
  url: string
  date: string
  tags?: string[]
  dateFormated?: string
  salary?: string
  isFavorite?: boolean
  image?: string
  logo?: string
  company_logo?: string
}

export interface ContextType {
  data: JobType[]
  keys: string[]
  refreshing: boolean
  error: boolean
  refresh: () => void
  handleFavorites?: (data: JobType) => void
  handleClearFavorites?: () => void
}

export interface handleFavorites {
  add: () => void
  clear: (keys: string[]) => void
}

// Add dummy default export for Expo Router
export default {};
