import * as React from "react";
import ListJobs from "../components/Listjobs/ListJobs";
import { NavigationParams } from "react-navigation";
import JobsContext from "../state/JobsContext";

interface Props {
  navigation: string;
}

class Jobs extends React.PureComponent<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };
  static contextType = JobsContext;

  render() {
    const navigate: string = this.props.navigation;
    const { data, refresh, refreshing } = this.context;

    return (
      <>
        <ListJobs
          jobs={data}
          navigate={navigate}
          refresh={refresh}
          refreshing={refreshing}
        />
      </>
    );
  }
}

export default Jobs;
