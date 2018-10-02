import React from 'react'
import { Modal, View, Text } from 'react-native'
import { Rating, Button } from 'react-native-elements'
import Rate from 'react-native-rate'

const options = {
  GooglePackageName: "com.remotework",
  preferInApp: false,
}

const RatingModal = (props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.ModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
  >
    <View style={{ flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
      <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
        <Text style={{ fontSize: 15, margin: 10 }}>
          Please, do not forget to rate the app.
            </Text>
        <View style={{ marginVertical: 5 }}>
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
            leftIcon={{ name: 'star', type: 'font-awesome', color: 'red' }}
            title='Rate Later!'
            onPress={() => {
              props.setModalVisible(!props.modalVisible)
            }}
          />
        </View>
      </View>
    </View>
  </Modal>
)

export default RatingModal