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
}

export interface handleFavorites {
  add: () => void;
  clear: (string) => void;
}
