import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
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
              <Icon name="briefcase" size={25} color={focused ? '#1E2229' : '#858585'} /> :
              <Icon name="heart-multiple" size={25} color={focused ? '#1E2229' : '#858585'} />
          }
        })}
        tabBarOptions={{
          tabStyle: {
              alignContent: 'center'
            },
          labelStyle: {
            fontSize: 13,
            fontWeight: 'bold'
          },
          style: {
            backgroundColor: '#F6F9FE',
            height: 55
          },
          activeTintColor: '#1E2229',
          inactiveTintColor: '#858585'
        }}
      >
        <Tab.Screen name="Jobs" component={Jobs} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
  )
}
