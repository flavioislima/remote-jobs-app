import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerAndroidOpenReturn
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
interface Props {
  onChangeText: (text: string) => void;
  onClearText: () => void;
  onDateChange?: (date: string) => void;
}

interface DatePicker {
  day: number;
  month: number;
  year: number;
}

export default (props: Props) => {
  const pickDate = async () => {
    DatePickerAndroid.open({
      date: new Date(),
      maxDate: Date.now()
    }).then((res) => {
      if (res.action !== DatePickerAndroid.dismissedAction) {
        const { year, month, day } = res as DatePicker;
        props.onDateChange(new Date(year, month, day).toJSON());
      } else {
        props.onDateChange(new Date(2016, 0, 1).toJSON());
      }
    });
  };

  return (
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
      <TouchableOpacity onPress={pickDate}>
        <Icon name="calendar" size={30} color={"#A7C8FF"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#112038",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  searchJobs: {
    width: "80%"
  }
});
