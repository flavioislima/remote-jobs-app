import React from "react";
import { ContextType } from "../types";

const initialContext: ContextType = {
  data: [],
  favorites: [],
  keys: [],
  refreshing: false,
  refresh: () => null,
  handleClearFavorites: () => null
};

export default React.createContext(initialContext);
