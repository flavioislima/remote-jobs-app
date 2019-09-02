import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { Favorites, Jobs } from "../screens";
import Icon from "react-native-vector-icons/FontAwesome";

const JobsStack = createStackNavigator({
  Jobs
});

JobsStack.navigationOptions = {
  tabBarLabel: "AllJobs",
  tabBarIcon: ({ focused }) => (
    <Icon name="briefcase" size={25} color={focused ? "#A7C8FF" : "darkgrey"} />
  )
};

const FavoritesStack = createStackNavigator({
  Favorites
});

FavoritesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon name="heart" size={25} color={focused ? "#A7C8FF" : "darkgrey"} />
  )
};

export default createBottomTabNavigator(
  {
    JobsStack,
    FavoritesStack
  },
  {
    tabBarOptions: {
      tabStyle: {
        alignContent: "center"
      },
      labelStyle: {
        display: "none",
        fontSize: 15,
        fontWeight: "bold"
      },
      style: {
        backgroundColor: "#112038",
        height: 55
      },
      activeTintColor: "white",
      inactiveTintColor: "darkgray"
    }
  }
);
