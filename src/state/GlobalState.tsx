import React from "react";
import JobsContext from "./JobsContext";
import { JobType } from "../types";
import { getAllJobs } from "../screens/utils";
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

    this.setState({
      data,
      refreshing: false,
      keys
    });
  };

  handleClearFavorites = () => {
    Alert.alert("Erase Favorites", "Are You Sure?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => this.setState({ keys: [] })
      }
    ]);
  };

  handleFavorites = (id: string) => {
    const { keys } = this.state;

    if (keys.includes(id)) {
      const filteredKeys = keys.filter((key) => key !== id);
      this.setState({
        keys: filteredKeys
      });
    } else {
      keys.push(id);
    }
  };

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
