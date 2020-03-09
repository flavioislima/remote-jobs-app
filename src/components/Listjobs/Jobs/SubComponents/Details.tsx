import React from 'react'
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'

interface Props {
  position: string
  company: string
  date: string
  image: any
}

export default (props: Props) => (
  <View style={styles.viewJob}>
    <Image style={styles.image} source={props.image} />
    <View style={styles.viewPosition}>
      <Text style={styles.position}>{props.position}</Text>
      <Text style={styles.company}>{props.company}</Text>
    </View>

    <View style={styles.viewDate}>
      <Text style={styles.date}>{props.date}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  viewJob: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 4,
    marginTop: 6,
  },
  viewPosition: {
    width: '66%',
    marginLeft: 6,
    marginTop: -4
  },
  viewDate: {
    width: '25%',
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
  }
})
