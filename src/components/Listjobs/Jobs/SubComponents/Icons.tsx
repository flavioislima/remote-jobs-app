import React from 'react'
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { JobType } from '../../../../types'

interface Props {
  data: JobType
  isFavorite: boolean
  url: string
  position: string
  company: string
  handleUrl: () => void
  handleSharing: () => void
  handleFavorite: () => void
}

const iconSize = 18

export default (props: Props) => (
  <View style={styles.iconsView}>
    <TouchableOpacity onPress={props.handleFavorite} style={styles.icons}>
      <Icon
        name={props.isFavorite ? 'heart-broken' : 'heart'}
        size={iconSize}
        color="#E22525"
      />
      <Text style={[styles.iconText]}>
        {props.isFavorite ? 'Saved' : 'Save'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.handleSharing} style={styles.icons}>
      <Icon name="share" size={iconSize} color="#A7C8FF" />
      <Text style={[styles.iconText]}>Share</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={props.handleUrl}
      onLongPress={Linking.openURL.bind(this, props.url)}
      style={styles.icons}
    >
      <Icon name="google-chrome" size={iconSize} color="#A7C8FF" />
      <Text style={styles.iconText}>Open</Text>
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
    width: '20%'
  },
  iconText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#112038',
    marginHorizontal: 5,
    textTransform: 'uppercase'
  }
})
