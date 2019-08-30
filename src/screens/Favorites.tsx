import React from "react";
import ListJobs from "../components/Listjobs/ListJobs";
import { NavigationParams } from "react-navigation";
import JobsContext from "../state/JobsContext";
import { Button } from "react-native-elements";

interface Props {
  navigation: any;
}

class Favorites extends React.PureComponent<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };
  static contextType = JobsContext;

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
          buttonStyle={{ height: 30, backgroundColor: "transparent" }}
          icon={{ name: "trash", type: "font-awesome", color: "red" }}
          title="Delete all Favorites"
          onPress={handleClearFavorites}
        />
      </>
    );
  }
}

export default Favorites;
