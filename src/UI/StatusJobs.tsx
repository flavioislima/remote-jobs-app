import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

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
        : `${props.length} Jobs found from ${new Date(
            props.date
          ).toUTCString().slice(5, 16)} in ${
            props.order ? 'Descending' : 'Ascending'
          } order`}
    </Text>
    <TouchableOpacity onPress={props.refresh} style={styles.reloadButton}>
      <Icon name="reload" type="material-community" size={23} color="#112038" />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  statusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
