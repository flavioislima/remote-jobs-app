import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import TabNavigator from './MainTabNavigator'
import BrowserScreen from '../screens/Browser'
import BackButton from '../assets/back.png'

const Back = (<Image source={BackButton} style={{ height: 28, width: 35 }} />)

const BrowserStack = createStackNavigator({
    Browser: {
        screen: BrowserScreen
    }
})

export default createStackNavigator({
    Tabs: {
        screen: TabNavigator,
        navigationOptions: () => ({
            headerStyle: {
                display: 'none'
            },
        })
    },
    Browser: {
        screen: BrowserStack,
        navigationOptions: () => ({
            headerTitle: 'Back to Jobs Search',
            headerStyle: {
                height: 40,
                backgroundColor: '#363636',
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 16,
            },
            headerBackImage: Back,
            gesturesEnabled: true
        })
    }
})