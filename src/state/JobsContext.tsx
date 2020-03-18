import React from 'react'
import { ContextType } from '../types'

const initialContext: ContextType = {
  data: [],
  keys: [],
  error: false,
  refreshing: false,
  refresh: () => null,
  handleClearFavorites: () => null
}

export default React.createContext(initialContext)
