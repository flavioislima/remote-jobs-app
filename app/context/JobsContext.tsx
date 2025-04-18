import { createContext } from 'react';
import { ContextType } from '../types';

// Initial context state
const initialContext: ContextType = {
  data: [],
  keys: [],
  error: false,
  refreshing: false,
  refresh: () => null,
  handleClearFavorites: () => null,
  handleFavorites: () => null
};

// Create the context
const JobsContext = createContext(initialContext);

export default JobsContext;
