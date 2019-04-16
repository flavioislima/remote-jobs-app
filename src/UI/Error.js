import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default () => (
  <View style={styles.container}>
    <Text style={styles.description}>Sorry, no Jobs Found! This is probably a Server or Network Error :(</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e8ee',
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center'
  },
  description: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center'
  },
})