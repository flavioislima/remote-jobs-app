import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={styles.salary}>{props.salary}</Text>
  </View>
)

const styles = StyleSheet.create({
  salary: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: '400',
    color: 'black'
  },
})