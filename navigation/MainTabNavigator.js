import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { RemoteOk, JSRemotely } from '../components/screens'

const RemoteOkStack = createStackNavigator({
    RemoteOk: RemoteOk
})

RemoteOkStack.navigationOptions = {
    tabBarLabel: 'RemoteOk',
    tabBarLabelStyle: {
        fontSize: 20
    }
}

const JSRemotelyStack = createStackNavigator({
    JSRemotely: JSRemotely
})

JSRemotelyStack.navigationOptions = {
    tabBarLabel: 'JSRemotely',
}

export default createBottomTabNavigator(
    {
        RemoteOkStack,
        JSRemotelyStack
    }, {
        tabBarOptions: {
            tabStyle: {
                borderLeftColor: 'white',
                borderRightColor: 'white',
                borderWidth: 0.2
            },
            labelStyle: {
                fontSize: 13,
                alignItems: 'center',
                marginBottom: 15
            },
            style: {
                backgroundColor: '#363636',
                borderTopColor: 'white',
                borderTopWidth: 0.5,
            },
            activeTintColor: 'white',
            inactiveTintColor: 'darkgray'
        }
    }
)
