import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Salary from './Salary'
import Tags from './Tags'

interface Props {
  description: string
  salary: string
  type: string
  tags: string[]
  date: string
}

export default ({ description, salary, tags, type, date }: Props) => {
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
      <Text numberOfLines={20} style={styles.description}>
        {formatedDescription}
      </Text>
      {salary && <Salary salary={salary} />}
      <Text style={styles.date}>Posted on: {date}</Text>
      <Tags tags={tags} type={type} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  description: {
    margin: 10,
    fontSize: 13,
    fontWeight: '400',
    color: 'black'
  },
  date: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400',
    color: '#112038',
    marginBottom: 5
  }
})
