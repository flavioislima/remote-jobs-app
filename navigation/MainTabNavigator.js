import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { RemoteOk, JSRemotely } from '../components/screens'

const RemoteOkStack = createStackNavigator({
    RemoteOk: RemoteOk
})

RemoteOkStack.navigationOptions = {
    tabBarLabel: 'RemoteOk',
    tabBarLabelStyle: {
        fontSize: 20
    }
    // tabBarIcon: (
    //     <Icon name='briefcase' size={25} color='#6efdff' />
    // )
}

const JSRemotelyStack = createStackNavigator({
    JSRemotely: JSRemotely
})

JSRemotelyStack.navigationOptions = {
    tabBarLabel: 'JSRemotely',
    // tabBarIcon: (
    //     <Icon name='globe' size={25} color='#6efdff' />
    // )

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
