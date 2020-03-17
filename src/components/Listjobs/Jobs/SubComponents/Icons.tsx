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
  handleSharing: () => void
  handleFavorite: () => void
}

const iconSize = 25
const iconColor = '#666'

export default (props: Props) => (
  <View style={styles.iconsView}>
    <TouchableOpacity onPress={props.handleFavorite} style={styles.icons}>
      <Icon
        name={props.isFavorite ? 'heart-broken' : 'heart'}
        size={iconSize}
        color={iconColor}
      />
      <Text style={[styles.iconText]}>
        {props.isFavorite ? 'Saved' : 'Save'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.handleSharing} style={styles.icons}>
      <Icon name="share" size={iconSize} color={iconColor} />
      <Text style={[styles.iconText]}>Share</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => Linking.openURL(props.url)}
      style={styles.icons}
    >
      <Icon name="google-chrome" size={iconSize} color={iconColor} />
      <Text style={styles.iconText}>Open</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 5
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    width: '30%'
  },
  iconText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#112038',
    marginLeft: 5,
    textTransform: 'uppercase'
  }
})
