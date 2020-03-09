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
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5
  },
  viewPosition: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '70%',
    marginLeft: 3
  },
  viewDate: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: 68,
    marginLeft: 3
  },
  image: {
    height: 30,
    width: 30,
    borderColor: '#858585',
    borderWidth: 1,
    borderRadius: 5
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
