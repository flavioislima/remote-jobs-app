import React from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import { Rating, Button } from 'react-native-elements'
import Rate from 'react-native-rate'

const options = {
  GooglePackageName: "com.remotework",
  preferInApp: false,
}

const RatingModal = (props) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.ModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
  >
    <View style={styles.modalView}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>
          Please, give us a feedback!
            </Text>
        <View>
          <Rating
            showRating
            type="star"
            fractions={0}
            startingValue={3.0}
            imageSize={40}
            onFinishRating={() => {
              Rate.rate(options, () => {
                props.rated('true')
                props.setModalVisible(!props.modalVisible)
              })
            }}
            style={{ paddingVertical: 10 }}
          />
          <Button
            transparent
            color='green'
            leftIcon={{ name: 'times-circle', type: 'font-awesome', color: 'red' }}
            title='Later!'
            onPress={() => {
              props.setModalVisible(!props.modalVisible)
            }}
          />
        </View>
      </View>
    </View >
  </Modal >
)

export default RatingModal

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  rating: {
    backgroundColor: 'white',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  ratingText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5
  },

})