import * as React from "react";
import ListJobs from "../components/Listjobs/ListJobs";
import { NavigationParams, withNavigationFocus } from "react-navigation";
import JobsContext from "../state/JobsContext";
import { JobType } from "../types";

interface Props {
  navigation: any;
  isFocused: boolean;
}

class Jobs extends React.PureComponent<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };
  static contextType = JobsContext;

  render() {
    const navigate: string = this.props.navigation;
    const { data, refresh, refreshing, keys } = this.context;

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

export default withNavigationFocus(Jobs);
