import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  refreshing: boolean
  length: number
  refresh: () => void
  date: string
  order: boolean
}

export default (props: Props) => (
  <View style={styles.statusView}>
    <Text style={styles.title}>
      {props.refreshing
        ? 'Searching for Remote Jobs...'
        : `${props.length} Jobs found`}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  statusView: {
    alignItems: 'center',
    marginTop: 3,
    marginHorizontal: 10
  },
  title: {
    color: '#858585',
    fontSize: 11
  },
  reloadButton: {
    alignSelf: 'center'
  }
})
