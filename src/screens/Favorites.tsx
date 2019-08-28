import React from "react";
import ListJobs from "../components/Listjobs/ListJobs";
import { NavigationParams } from "react-navigation";
import JobsContext from "../state/JobsContext";
import { JobType } from "../types";
import { Button } from "react-native-elements";

interface Props {
  navigation: string;
}

class Favorites extends React.PureComponent<Props> {
  static navigationOptions: NavigationParams = {
    header: null
  };
  static contextType = JobsContext;

  render() {
    const navigate: string = this.props.navigation;
    const { data, refresh, refreshing, handleClearFavorites } = this.context;

    const favFilter = (item: JobType) => item.isFavorite === true;
    const favorites: JobType[] = data.filter(favFilter);

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
