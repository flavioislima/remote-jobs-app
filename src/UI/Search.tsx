import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  DatePickerAndroid
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
interface Props {
  order: boolean;
  setOrder: () => void;
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
  const { order, setOrder, onDateChange, onChangeText, onClearText } = props;

  const pickDate = async () => {
    DatePickerAndroid.open({
      date: new Date(),
      maxDate: Date.now()
    }).then((res) => {
      if (res.action !== DatePickerAndroid.dismissedAction) {
        const { year, month, day } = res as DatePicker;
        onDateChange(new Date(year, month, day).toJSON());
      } else {
        onDateChange(new Date(2016, 0, 1).toJSON());
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
          onChangeText={onChangeText}
          onClearText={onClearText}
          containerStyle={{
            backgroundColor: "#112038",
            borderTopColor: "#112038",
            height: 60
          }}
          placeholderTextColor={"#A7C8FF"}
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={pickDate}>
          <Icon name="calendar" size={30} color={"#A7C8FF"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={setOrder}>
          <Icon
            name={order ? "sort-amount-desc" : "sort-amount-asc"}
            size={25}
            color={"#A7C8FF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-between",
    backgroundColor: "#112038",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  searchJobs: {
    width: "70%",
    marginLeft: 15
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "22%",
    marginRight: 10
  }
});
