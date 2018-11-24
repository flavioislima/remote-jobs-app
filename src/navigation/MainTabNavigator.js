import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { RemoteOk, JSRemotely, Favorites, Indeed } from '../screens'

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

const IndeedStack = createStackNavigator({
    Indeed: Indeed
})

IndeedStack.navigationOptions = {
    tabBarLabel: 'Indeed',
}

const FavoritesStack = createStackNavigator({
    Favorites: Favorites
})

FavoritesStack.navigationOptions = {
    tabBarLabel: 'Saved',
}

export default createBottomTabNavigator(
    {
        IndeedStack,
        JSRemotelyStack,
        RemoteOkStack,
        FavoritesStack
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
                marginBottom: 12
            },
            style: {
                backgroundColor: '#363636',
                borderTopColor: 'white',
                borderTopWidth: 0.5,
                height: 40
            },
            activeTintColor: 'white',
            inactiveTintColor: 'darkgray'
        }
    }
)
