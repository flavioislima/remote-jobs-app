import React from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";

interface Props {
  onChangeText: (text: string) => void;
  onClearText: () => void;
}

export default (props: Props) => (
  <View style={styles.searchView}>
    <View style={styles.searchJobs}>
      <SearchBar
        round
        inputStyle={{
          backgroundColor: "white"
        }}
        clearIcon={{ type: "font-awesome", name: "clear", color: "#A7C8FF" }}
        placeholder="Search for Jobs..."
        onChangeText={props.onChangeText}
        onClearText={props.onClearText}
        containerStyle={{
          backgroundColor: "#112038",
          borderTopColor: "#112038",
          height: 60
        }}
        placeholderTextColor={"#A7C8FF"}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#112038",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  searchJobs: {
    width: "92%"
  }
});
