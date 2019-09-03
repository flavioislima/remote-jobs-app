import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

interface Props {
  refreshing: boolean;
  length: number;
  refresh: () => void;
}

export default (props: Props) => (
  <View style={styles.statusView}>
    <Text style={styles.title}>
      {props.refreshing
        ? "Searching for Remote Jobs..."
        : `${props.length} Jobs found`}
    </Text>
    <TouchableOpacity onPress={props.refresh} style={styles.reloadButton}>
      <Icon name="refresh" size={23} color="#112038" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  statusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    marginHorizontal: 10
  },
  title: {
    color: "#A7C8FF",
    fontSize: 11
  },
  reloadButton: {
    alignSelf: "center"
  }
});
