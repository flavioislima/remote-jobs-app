import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default (props) => (
  !props.rated ?
    <TouchableOpacity
      onPress={() => props.setModalVisible(!props.modalVisible)}
      style={styles.icons}>
      <Icon name='star' size={15} color='yellow' />
      <Text style={styles.iconText}>Rate Us</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity
      onPress={() => props.setModalVisible(!props.modalVisible)}
      style={styles.icons}>
      <Icon name='star' size={15} color='yellow' />
      <Icon name='star' size={15} color='yellow' />
      <Icon name='star' size={15} color='yellow' />
      <Icon name='star' size={15} color='yellow' />
      <Icon name='star' size={15} color='yellow' />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    borderColor: 'yellow',
    borderRadius: 10
  },
  iconText: {
    fontSize: 14,
    color: 'yellow',
    marginLeft: 5
  }
})