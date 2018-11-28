import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => (
  <View>
    <View style={styles.tagsView}>
      {props.tags.map((tag, i) => <Text style={styles.tags} key={i}>{(tag).toUpperCase()}</Text>)}
    </View>
  </View>
)

const styles = StyleSheet.create({
  tagsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  tags: {
    fontSize: 11,
    backgroundColor: '#e1e8ee',
    color: 'black',
    padding: 4,
    margin: 3,
    borderWidth: 0.1,
    borderRadius: 4,
  },
})