import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Tags from './Tags'
import Type from './Type'
import Salary from './Salary'

export default (props) => (
  <View>
    <Text
      numberOfLines={10}
      style={styles.description}>{props.description}</Text>
    {props.salary && <Salary salary={props.salary} />}
    {
      props.tags && <Tags tags={props.tags} /> ||
      props.type && <Type type={props.type} />
    }
  </View>
)

const styles = StyleSheet.create({
  description: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: '400',
    color: 'black'
  },
})