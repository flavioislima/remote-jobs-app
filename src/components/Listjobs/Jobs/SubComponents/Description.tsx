import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Salary from './Salary'
import Tags from './Tags'

interface Props {
  description: string
  salary: string
  type: string
  tags: string[]
}

export default ({ description, salary, tags, type }: Props) => {
  const formatedDescription: string = description
    ? description
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&amp;/gm, '&')
        .replace(/&#8211;/gm, '-')
        .replace(
          /&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm,
          '"'
        )
        .trim()
    : 'Open Url for more information'

  return (
    <View style={styles.container}>
      <Text numberOfLines={10} style={styles.description}>
        {formatedDescription}
      </Text>
      {salary && <Salary salary={salary} />}
      <Tags tags={tags} type={type} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  description: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 11,
    fontWeight: '400',
    color: 'black'
  }
})
