import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  type: string;
}

export default (props: Props) => (
  <View style={styles.typeView}>
    <Text style={styles.types}>{props.type.toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create({
  typeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    marginBottom: 5
  },
  types: {
    fontSize: 11,
    backgroundColor: "#e1e8ee",
    color: "black",
    padding: 4,
    margin: 3,
    borderWidth: 0.1,
    borderRadius: 4
  }
});
