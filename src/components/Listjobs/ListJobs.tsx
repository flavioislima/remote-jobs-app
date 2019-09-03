import React, { useEffect, useState } from "react";
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
import Error from "../../UI/Error";
import StatusJobs from "../../UI/StatusJobs";
import Job from "./Jobs/Job";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  refresh: () => void;
  jobs: JobType[];
  refreshing: boolean;
  navigate: any;
  error?: boolean;
  clearFavorites?: () => void;
  handleClearFavorites?: () => void;
}

const ListJobs: React.FC<Props> = (props: Props) => {
  const { jobs, refreshing, refresh, error } = props;

  const [filterText, setFilterText] = useState("");
  const [isRated, setRated] = useState(false);

  const filterRegex: RegExp = new RegExp(String(filterText), "i");
  const filter = (item: JobType) => filterRegex.test(item.position);
  const filteredData: JobType[] = jobs.filter(filter);

  const renderJobs = (job: any) => {
    const { refresh, navigate } = props;
    return <Job data={job.item} navigate={navigate} refresh={refresh} />;
  };

  const extractKeys = (job: JobType) => job.url;

  useEffect(() => {
    AsyncStorage.getItem("rated").then((rated) => setRated(JSON.parse(rated)));
  }, [isRated]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#112038" />
      <SafeAreaView>
        <Search
          onChangeText={setFilterText}
          onClearText={setFilterText.bind(this, "")}
        />
      </SafeAreaView>
      {error && <Error />}
      <StatusJobs
        refreshing={refreshing}
        length={filteredData.length}
        refresh={refresh}
      />
      <FlatList
        style={styles.container}
        data={filteredData}
        renderItem={renderJobs}
        keyExtractor={extractKeys}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  }
});

export default ListJobs;
