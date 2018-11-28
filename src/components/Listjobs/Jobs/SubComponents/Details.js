import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => (
  <View style={styles.viewJob}>
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
    backgroundColor: '#1abc9c',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  viewPosition: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%',
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
  position: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white'
  },
  company: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white'
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    color: 'white',
    marginBottom: 3
  },
})