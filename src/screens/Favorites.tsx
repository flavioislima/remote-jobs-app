import React from "react";
import ListJobs from "../components/Listjobs/ListJobs";
import { NavigationParams, withNavigationFocus } from "react-navigation";
import JobsContext from "../state/JobsContext";
import { Button } from "react-native-elements";

interface Props {
  navigation: any;
  isFocused: boolean;
}

class Favorites extends React.PureComponent<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };
  static contextType = JobsContext;

  componentDidUpdate(prevProps: Props) {
    // Not the best solution, working on a new one since the component is not updating itself after changing props;
    if (prevProps.isFocused !== this.props.isFocused) {
      this.forceUpdate();
    }
  }

  render() {
    const navigate: string = this.props.navigation;
    const { favorites, refreshing, handleClearFavorites } = this.context;
    const refresh = () => this.forceUpdate();

    return (
      <>
        <ListJobs
          jobs={favorites}
          navigate={navigate}
          refresh={refresh}
          refreshing={refreshing}
          clearFavorites={handleClearFavorites}
        />
        <Button
          large
          textStyle={{ color: "red" }}
          buttonStyle={{ height: 25, backgroundColor: "transparent" }}
          icon={{ name: "trash", type: "font-awesome", color: "red" }}
          title="Delete all Favorites"
          onPress={handleClearFavorites}
        />
      </>
    );
  }
}

export default withNavigationFocus(Favorites);
