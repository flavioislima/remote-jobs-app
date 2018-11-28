
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default (props) => (
  <View style={styles.iconsView}>
    <TouchableOpacity
      onPress={() => props.handleFavorite(props.data)}
      style={styles.icons}>
      <Icon name={props.isFavorite ? 'heart' : 'heart-o'} size={25} color='red' />
      <Text style={[styles.iconText, { color: 'red' }]}>{props.isFavorite ? 'Saved' : 'Save'}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => props.handleUrl(props.url)}
      onLongPress={() => Linking.openURL(props.url)}
      style={styles.icons}>
      <Icon name='globe' size={25} color='blue' />
      <Text style={styles.iconText}>Open</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => props.handleSharing(props.url, props.position, props.company)}
      style={styles.icons}>
      <Icon name='retweet' size={25} color='purple' />
      <Text style={[styles.iconText, { color: 'purple' }]}>Share</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginVertical: 5
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    width: '20%',
  },
  iconText: {
    fontSize: 13,
    color: 'blue',
    marginLeft: 5
  }
})