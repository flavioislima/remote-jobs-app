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

// const JobsStack = createStackNavigator({
//   Jobs
// });

// JobsStack.navigationOptions = {
//   tabBarLabel: 'AllJobs',
//   tabBarIcon: ({ focused }) => (
//     <Icon name="briefcase" size={25} color={focused ? '#A7C8FF' : 'darkgrey'} />
//   )
// };

// const FavoritesStack = createStackNavigator({
//   Favorites
// });

// FavoritesStack.navigationOptions = {
//   tabBarIcon: ({ focused }) => (
//     <Icon name="heart" size={25} color={focused ? '#A7C8FF' : 'darkgrey'} />
//   )
// };

// export default createBottomTabNavigator(
//   {
//     JobsStack,
//     FavoritesStack
//   },
//   {
//     tabBarOptions: {
//       tabStyle: {
//         alignContent: 'center'
//       },
//       labelStyle: {
//         display: 'none',
//         fontSize: 15,
//         fontWeight: 'bold'
//       },
//       style: {
//         backgroundColor: '#112038',
//         height: 55
//       },
//       activeTintColor: 'white',
//       inactiveTintColor: 'darkgray'
//     }
//   }
// );
