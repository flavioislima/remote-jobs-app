import React from "react";
import JobsContext from "./JobsContext";
import { JobType } from "../types";
import { getAllJobs, storeState, getStateFromStorage } from "../screens/utils";
import { Alert } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  data: JobType[];
  favorites: JobType[];
  keys: string[];
  refreshing: boolean;
}

export default class GlobalState extends React.Component<Props> {
  state: State = {
    data: [],
    favorites: [],
    keys: [],
    refreshing: false
  };

  refresh = async (): Promise<void> => {
    this.setState({ data: [], refreshing: true });
    const keys = this.state.keys;
    const allJobs: JobType[] = await getAllJobs();

    const favFilter = (item: JobType) => keys.includes(item.id);
    const data = allJobs.map((job) => {
      return { ...job, isFavorite: favFilter(job) };
    });
    const favorites = data.filter(favFilter);

    this.setState({
      data,
      favorites,
      refreshing: false,
      keys
    });
    this.storeState;
  };

  async componentDidMount() {
    const storedState = await getStateFromStorage();
    const { data, favorites, keys } = storedState;
    if (data.length > 100) {
      this.setState({ data, favorites, keys });
    } else {
      this.refresh();
    }
  }

  async componentWillUnmount() {
    this.storeState();
  }

  handleClearFavorites = () => {
    Alert.alert("Erase Favorites", "Are You Sure?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          this.setState({ keys: [], favorites: [] });
          this.refresh();
          this.storeState();
        }
      }
    ]);
  };

  handleFavorites = (data: JobType) => {
    const { keys, favorites } = this.state;

    if (keys.includes(data.id)) {
      const filteredKeys: string[] = keys.filter((key) => key !== data.id);
      const filteredFavorites = favorites.filter((fav) => fav.id !== data.id);

      this.setState({
        keys: filteredKeys,
        favorites: filteredFavorites
      });

      this.storeState();
    } else {
      favorites.push({ ...data, isFavorite: true });
      keys.push(data.id);
      this.storeState();
    }
  };

  private storeState() {
    const { data, favorites, keys } = this.state;
    storeState({ data, favorites, keys });
  }

  render() {
    const { data, favorites, keys, refreshing } = this.state;

    return (
      <JobsContext.Provider
        value={{
          data,
          favorites,
          keys,
          refreshing,
          refresh: this.refresh,
          handleClearFavorites: this.handleClearFavorites,
          handleFavorites: this.handleFavorites
        }}
      >
        {this.props.children}
      </JobsContext.Provider>
    );
  }
}
