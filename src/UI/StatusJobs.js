import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default (props) => (
  props.refreshing ?
    <Text
      style={styles.title}
    >Searching on {props.source}...</Text>
    :
    <Text
      style={styles.title}
    >{props.length} Jobs found on {props.source}</Text>
)

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 14,
    width: '80%'
  }
})