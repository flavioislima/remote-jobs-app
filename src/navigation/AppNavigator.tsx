import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Image } from 'react-native'

import BrowserScreen from '../screens/Browser'
import TabNavigator from './MainTabNavigator'

const BackButton = require('../assets/back.png')

const Back = () => <Image source={BackButton} style={{ height: 28, width: 35 }} />

const Stack = createStackNavigator()

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={TabNavigator}
          options={{
            header: () => null
        }}
        />
        <Stack.Screen name="Browser" component={BrowserScreen} options={{
          headerTitle: 'Back to Jobs Search',
          headerStyle: {
            height: 40,
            backgroundColor: '#112038'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 16
          },
          headerBackImage: Back,
          gestureEnabled: true
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
