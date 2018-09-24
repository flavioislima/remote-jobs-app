import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { RemoteOk, JSRemotely } from '../components/screens'

const RemoteOkStack = createStackNavigator({
    RemoteOk: RemoteOk
})

RemoteOkStack.navigationOptions = {
    tabBarLabel: 'RemoteOk',
    tabBarIcon: (
        <Icon name='briefcase' size={25} color='#000' />
    )
}

const JSRemotelyStack = createStackNavigator({
    JSRemotely: JSRemotely
})

JSRemotelyStack.navigationOptions = {
    tabBarLabel: 'JSRemotely',
    tabBarIcon: (
        <Icon name='globe' size={25} color='#000' />
    )

}

export default createBottomTabNavigator({
    RemoteOkStack,
    JSRemotelyStack
})