import * as React from 'react';
import ListJobs from '../components/Listjobs/ListJobs';
import { Context } from '../../App';

interface Props {
  navigation: string;
}

class Jobs extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const navigate: string = this.props.navigation;
    return (
      <Context.Consumer>
        {context => (
          <ListJobs
            jobs={context.data}
            navigate={navigate}
            refresh={context.refresh}
            refreshing={context.refreshing}
          />
        )}
      </Context.Consumer>
    );
  }
}

export default Jobs;
