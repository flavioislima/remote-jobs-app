import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button, Rating } from "react-native-elements";
import Rate from "react-native-rate";
import AsyncStorage from "@react-native-community/async-storage";

const options = {
  GooglePackageName: "com.remotework",
  preferInApp: true
};

interface Props {
  modalVisible: boolean;
  rated: (value: string) => Promise<void>;
  setModalVisible: (value: boolean) => void;
}

const sendNull = () => null;
const onFinishRating = (
  rated: (value: string) => void,
  setModalVisible: (value: boolean) => void,
  modalVisible: boolean
) => {
  Rate.rate(options, () => {
    rated("true");
    setModalVisible(!modalVisible);
    AsyncStorage.setItem("count", "0");
  });
};

const handleOnPress = (
  setModalVisible: (value: boolean) => void,
  modalVisible: boolean
) => {
  return setModalVisible(!modalVisible);
};

const RatingModal = (props: Props) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={sendNull}
  >
    <View style={styles.modalView}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>Please, give us a feedback!</Text>
        <View>
          <Rating
            showRating
            type="star"
            fractions={0}
            startingValue={3.0}
            imageSize={40}
            onFinishRating={onFinishRating.bind(
              props.rated,
              props.setModalVisible,
              props.modalVisible
            )}
          />
          <Button
            // transparent
            // color="green"
            icon={{
              name: "times-circle",
              type: "font-awesome"
            }}
            title="Later!"
            onPress={handleOnPress.bind(
              props.setModalVisible,
              props.modalVisible
            )}
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default RatingModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  rating: {
    backgroundColor: "white",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  ratingText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5
  },
  ratingOther: {
    paddingVertical: 10
  }
});
