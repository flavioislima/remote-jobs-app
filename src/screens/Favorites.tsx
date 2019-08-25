import React from 'react';
import ListJobs from '../components/Listjobs/ListJobs';
import { Context } from '../../App';

interface Props {
  navigation: string;
}

class Favorites extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const navigate: string = this.props.navigation;
    return (
      <Context.Consumer>
        {context => (
          <ListJobs
            jobs={context.favorites}
            navigate={navigate}
            refresh={context.refresh}
            refreshing={context.refreshing}
            clearFavorites={context.handleClearFavorites}
            favorites
          />
        )}
      </Context.Consumer>
    );
  }
}

export default Favorites;
