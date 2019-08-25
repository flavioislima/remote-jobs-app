import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { JobType } from './src/types';
import { getAllJobs, clearFavorites, getFavorites } from './src/screens/utils';
import { Alert } from 'react-native';

interface contextType {
  data: JobType[];
  favorites: JobType[];
  keys: string[];
  refreshing: boolean;
  refresh: () => void;
  handleClearFavorites?: () => void;
}

const initialContext: contextType = {
  data: [],
  favorites: [],
  keys: [],
  refreshing: false,
  refresh: () => this.refresh,
  handleClearFavorites: () => this.handleClearFavorites
};

export const Context = React.createContext(initialContext);

export default class App extends React.Component {
  state: contextType = {
    data: [],
    favorites: [],
    keys: [],
    refreshing: false,
    refresh: () => this.refresh(),
    handleClearFavorites: () => this.handleClearFavorites()
  };

  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    this.setState({ data: [], refreshing: true });
    const allJobs: JobType[] = await getAllJobs();
    const favorites = await getFavorites();
    this.setState({
      data: allJobs,
      refreshing: false,
      favorites: favorites.data,
      keys: favorites.keys
    });
  };

  handleClearFavorites = () => {
    Alert.alert('Erase Favorites', 'Are You Sure?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () =>
          clearFavorites(this.state.keys) && this.setState({ favorites: [] })
      }
    ]);
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <AppNavigator />
      </Context.Provider>
    );
  }
}
