import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  position: string
  company: string
  date: string
  image: any
  showIcons: () => void
}

export default ({ image, position, date, company, showIcons }: Props) => {
 return (
  <View style={styles.viewJob}>
    <Image style={styles.image} source={image} PlaceholderContent={<ActivityIndicator />} />
    <View style={styles.viewPosition}>
      <Text style={styles.position}>{position}</Text>
      <Text style={styles.company}>{company}</Text>
    </View>

    <View style={styles.viewDate}>
      <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.dots} onPress={showIcons}>
        <Icon name="dots-vertical" color={'#000'} size={22} />
      </TouchableOpacity>
  </View>
)}

const styles = StyleSheet.create({
  viewJob: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 4,
    marginTop: 6
  },
  viewPosition: {
    width: '66%',
    marginLeft: 6,
    marginTop: -4
  },
  viewDate: {
    width: '18%',
    marginLeft: 2
  },
  image: {
    height: 35,
    width: 35,
    borderColor: '#858585',
    borderWidth: 1,
    borderRadius: 1
  },
  position: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222B38',
    width: '100%'
  },
  company: {
    fontSize: 11,
    fontWeight: '400',
    color: '#112038'
  },
  date: {
    fontSize: 10,
    fontWeight: '400',
    color: '#112038',
    marginBottom: 3
  },
  dots: {
    height: '50%'
  }
})
