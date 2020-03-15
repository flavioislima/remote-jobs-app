import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  tags?: string[]
}

export default ({tags}: Props) => (
  <View>
    <View style={styles.tagsView}>
      {tags && tags.map((tag, i) => (
        <Text style={styles.tags} key={i}>
          {tag}
        </Text>
      ))}
    </View>
  </View>
)

const styles = StyleSheet.create({
  tagsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  tags: {
    fontSize: 10,
    textTransform: 'uppercase',
    backgroundColor: '#fff',
    color: 'black',
    padding: 4,
    margin: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    textAlign: 'center'
  }
})
