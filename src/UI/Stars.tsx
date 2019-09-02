import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  isRated: boolean;
  modalVisible: boolean;
  setModalVisible: () => void;
}

export default (props: Props) =>
  !props.isRated ? (
    <TouchableOpacity onPress={props.setModalVisible} style={styles.icons}>
      <Text style={styles.iconText}>Rate Us</Text>
      <Icon name="star" size={15} color="yellow" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={props.setModalVisible} style={styles.icons}>
      <Icon name="star" size={15} color="yellow" />
      <Icon name="star" size={15} color="yellow" />
      <Icon name="star" size={15} color="yellow" />
      <Icon name="star" size={15} color="yellow" />
      <Icon name="star" size={15} color="yellow" />
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    marginLeft: 5
  },
  iconText: {
    fontSize: 14,
    color: "yellow",
    marginRight: 5
  }
});
