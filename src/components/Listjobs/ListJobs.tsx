import React from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";

import { JobType } from "../../types";
import Search from "../../UI/Search";
import Stars from "../../UI/Stars";
import StatusJobs from "../../UI/StatusJobs";
import Job from "./Jobs/Job";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  refresh: () => void;
  jobs: JobType[];
  refreshing: boolean;
  navigate: any;
  clearFavorites?: () => void;
  handleClearFavorites?: () => void;
}

let RatingModal: any = null;
const Error: any = null;

export default class ListJobs extends React.PureComponent<Props> {
  state = {
    filterText: "",
    modalVisible: false,
    rated: false,
    error: false
  };

  onSearchJobs = (filterText: string) => {
    this.setState({ filterText });
  };

  onClearSearch = () => {
    this.setState({ filterText: "" });
  };

  setModalVisible = (visible: boolean) => {
    if (RatingModal === null) {
      RatingModal = require("../../UI/RatingModal").default;
    }

    this.setState({ modalVisible: visible });
    console.log(this.state.modalVisible);
    console.log(RatingModal);
  };

  rated = async (rated: string) => {
    await AsyncStorage.setItem("rated", rated).then(async () => {
      await AsyncStorage.getItem("rated").then((info) => {
        this.setState({ rated: info });
      });
    });
  };

  renderJobs = (job: any) => {
    const { refresh, navigate } = this.props;
    return <Job data={job.item} navigate={navigate} refresh={refresh} />;
  };

  extractKeys = (job: JobType) => job.url;

  componentDidMount() {
    AsyncStorage.getItem("rated").then((rated) =>
      this.setState({ rated: JSON.parse(rated) })
    );
  }

  render() {
    const { jobs, refreshing, refresh } = this.props;

    const filterRegex: RegExp = new RegExp(String(this.state.filterText), "i");
    const filter = (item: JobType) => filterRegex.test(item.position);
    const filteredData: JobType[] = jobs.filter(filter);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#112038" />
        <SafeAreaView>
          <View style={styles.status}>
            <Stars
              rated={this.state.rated}
              modalVisible={this.state.modalVisible}
              setModalVisible={this.setModalVisible}
            />
            {this.state.modalVisible && (
              <RatingModal
                rated={this.rated}
                modalVisible={this.state.modalVisible}
                setModalVisible={this.setModalVisible}
              />
            )}
          </View>
        </SafeAreaView>
        <Search
          onChangeText={this.onSearchJobs}
          onClearText={this.onClearSearch}
        />
        {this.state.error && <Error />}
        <StatusJobs
          refreshing={refreshing}
          length={filteredData.length}
          refresh={refresh}
        />
        <FlatList
          style={styles.container}
          data={filteredData}
          renderItem={this.renderJobs}
          keyExtractor={this.extractKeys}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  contentContainer: {
    paddingTop: 0
  },
  status: {
    backgroundColor: "#112038",
    paddingTop: 0
  }
});
