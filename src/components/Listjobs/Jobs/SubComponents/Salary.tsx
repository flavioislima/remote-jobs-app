import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  salary: string
}

export default (props: Props) => (
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
  }
})
