export interface JobType {
  id: string;
  position: string | undefined;
  company: string;
  description: string;
  url: string;
  date: string;
  tags?: string[];
  dateFormated?: string;
  type?: string;
  salary?: string;
  isFavorite?: boolean;
}

export interface ContextType {
  data: JobType[];
  favorites: JobType[];
  keys: string[];
  refreshing: boolean;
  refresh?: () => void;
  handleFavorites?: (data: JobType) => void;
  handleClearFavorites?: () => void;
}

export interface handleFavorites {
  add: () => void;
  clear: (keys: string[]) => void;
}
