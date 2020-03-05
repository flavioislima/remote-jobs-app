import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Favorites, Jobs } from '../screens'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return route.name === 'Jobs' ?
              <Icon name="briefcase" size={25} color={focused ? '#A7C8FF' : 'darkgrey'} /> :
              <Icon name="heart-multiple" size={25} color={focused ? '#A7C8FF' : 'darkgrey'} />
          }
        })}
        tabBarOptions={{
          tabStyle: {
              alignContent: 'center'
            },
          labelStyle: {
            display: 'none',
            fontSize: 15,
            fontWeight: 'bold'
          },
          style: {
            backgroundColor: '#112038',
            height: 55
          },
          activeTintColor: 'white',
          inactiveTintColor: 'darkgray'
        }}
      >
        <Tab.Screen name="Jobs" component={Jobs} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
  )
}
