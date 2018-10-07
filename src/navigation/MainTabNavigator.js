import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { RemoteOk, JSRemotely, Favorites } from '../components/screens'

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

const FavoritesStack = createStackNavigator({
    Favorites: Favorites
})

FavoritesStack.navigationOptions = {
    tabBarLabel: 'Favorites',
}

export default createBottomTabNavigator(
    {
        JSRemotelyStack,
        RemoteOkStack,
        Favorites
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
